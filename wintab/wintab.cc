#include <node.h>
#include <v8.h>
#include <Windows.h>
#include <iostream>

#include "WINTAB.H"

#include "Utils.h"
char* gpszProgramName = "node_wintab";

#include "MSGPACK.H"

#define PACKETDATA (PK_X | PK_Y | PK_BUTTONS | PK_NORMAL_PRESSURE)
#define PACKETMODE PK_BUTTONS
#include "PKTDEF.H"

using namespace v8;
using namespace std;

int32_t pen_x = -1;
int32_t pen_y = -1;
int32_t pen_pressure = -1;
int32_t pressure_min = -1;
int32_t pressure_max = -1;

void get_pressure(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    args.GetReturnValue().Set(NumberObject::New(pen_pressure));
}

void get_pressure_min(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    args.GetReturnValue().Set(NumberObject::New(pressure_min));
}

void get_pressure_max(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    args.GetReturnValue().Set(NumberObject::New(pressure_max));
}

HINSTANCE hinst;
WNDCLASS wc;
HWND hwnd;

HCTX hctx;
LOGCONTEXT lc = {0};

bool overlapped = FALSE;

void peek_message(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    MSG msg;
    while (PeekMessage(&msg, NULL, 0, 0, PM_REMOVE)) {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }
    args.GetReturnValue().SetUndefined();
}

void check_overlapped(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    bool tmp = overlapped;
    overlapped = FALSE;
    args.GetReturnValue().Set(BooleanObject::New(tmp));
}

void enable_context(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    if (hctx) {
        gpWTEnable(hctx, TRUE);
        gpWTOverlap(hctx, TRUE);
    }
}

HCTX initTablet(HWND hwnd) {
    AXIS TabletX = {0};
    AXIS TabletY = {0};
    AXIS Pressure = {0};
    lc.lcOptions |= CXO_SYSTEM;
    if (gpWTInfoA(WTI_DEFSYSCTX, 0, &lc) != sizeof(LOGCONTEXT))
        return (HCTX) NULL;
    if (!(lc.lcOptions & CXO_SYSTEM))
        return (HCTX) NULL;
    wsprintf(lc.lcName, "node_wintab_%x", hinst);
    lc.lcPktData = PACKETDATA;
    lc.lcOptions |= CXO_MESSAGES;
    lc.lcPktMode = PACKETMODE;
    lc.lcMoveMask = PACKETDATA;
    lc.lcBtnUpMask = lc.lcBtnDnMask;
    if (gpWTInfoA(WTI_DEVICES, DVC_X, &TabletX) != sizeof(AXIS))
        return (HCTX) NULL;
    if (gpWTInfoA(WTI_DEVICES, DVC_Y, &TabletY) != sizeof(AXIS))
        return (HCTX) NULL;
    if (gpWTInfoA(WTI_DEVICES, DVC_NPRESSURE, &Pressure) != sizeof(AXIS))
        return (HCTX) NULL;
    lc.lcInOrgX = 0;
    lc.lcInOrgY = 0;
    lc.lcInExtX = TabletX.axMax;
    lc.lcInExtY = TabletY.axMax;
    lc.lcOutOrgX = GetSystemMetrics(SM_XVIRTUALSCREEN);
    lc.lcOutOrgY = GetSystemMetrics(SM_YVIRTUALSCREEN);
    lc.lcOutExtX = GetSystemMetrics(SM_CXVIRTUALSCREEN);
    lc.lcOutExtY = -GetSystemMetrics(SM_CYVIRTUALSCREEN);
    pressure_min = (int32_t) Pressure.axMin;
    pressure_max = (int32_t) Pressure.axMax;
    return gpWTOpenA(hwnd, &lc, TRUE);
}

LRESULT msgLoop(HWND hwnd, unsigned msg, WPARAM wp, LPARAM lp) {
    PACKET pkt;
    switch (msg) {
    case WM_CREATE:
        hctx = initTablet(hwnd);
        break;
    case WM_NCCREATE:
        break;
    case WT_PACKET:
        if (gpWTPacket((HCTX) lp, wp, &pkt)) {
            pen_x = (int32_t) pkt.pkX;
            pen_y = (int32_t) pkt.pkY;
            pen_pressure = (int32_t) pkt.pkNormalPressure;
        }
        break;
    case WT_CTXOVERLAP:
        overlapped = TRUE;
        break;
    case WT_PROXIMITY:
        pen_x = -1;
        pen_y = -1;
        pen_pressure = -1;
        break;
    default:
        return (LRESULT) 0L;
    }
    return DefWindowProc(hwnd, msg, wp, lp);
}

void init(Handle<Object> exports) {
    hinst = (HINSTANCE) GetModuleHandle(NULL);
    wc.style = 0;
    wc.lpfnWndProc = (WNDPROC) msgLoop;
    wc.cbClsExtra = 0;
    wc.cbWndExtra = 0;
    wc.hInstance = hinst;
    wc.hIcon = LoadIcon(NULL, IDI_APPLICATION);
    wc.hCursor = LoadCursor(NULL, IDC_ARROW);
    wc.hbrBackground = (HBRUSH) (COLOR_APPWORKSPACE + 1);
    wc.lpszMenuName =  "wintabMenu";
    wc.lpszClassName = "wintabClass";
    RegisterClass(&wc);
    LoadWintab();
    hwnd = CreateWindow(
        "wintabClass",
        "wintabWindow",
        WS_OVERLAPPED, CW_USEDEFAULT, CW_USEDEFAULT,
        CW_USEDEFAULT, CW_USEDEFAULT, (HWND) NULL,
        (HMENU) NULL, hinst, (LPVOID) NULL
    );
    NODE_SET_METHOD(exports, "pressure", get_pressure);
    NODE_SET_METHOD(exports, "minPressure", get_pressure_min);
    NODE_SET_METHOD(exports, "maxPressure", get_pressure_max);
    NODE_SET_METHOD(exports, "peekMessage", peek_message);
    NODE_SET_METHOD(exports, "checkOverlapped", check_overlapped);
    NODE_SET_METHOD(exports, "enableContext", enable_context);
}

NODE_MODULE(wintab, init);
