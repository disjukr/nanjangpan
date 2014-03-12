난장판
===
드로잉툴입니다.


돌리는 법
---
이 프로젝트는 node-webkit 0.9.2 버전에 얹혀서 돌아갑니다.
따라서 [node-webkit 0.9.2 바이너리][1]가 필요합니다.
윈도 전용입니다. 맥이나 리눅스는 아직 지원할 생각이 없습니다.

[1]: https://s3.amazonaws.com/node-webkit/v0.9.2/node-webkit-v0.9.2-win-ia32.zip

### 전제조건

 * python 2.7 이상 (3.x 미만)
 * MSVC++ 2012
 * node package manager

이상의 환경이 갖춰져있다고 가정하고 설명하겠습니다.

난장판 프로젝트는 와콤 타블렛의 필압정보를 받아오기 위해서 wintab api(`Wintab32.dll`)의 바인딩을 제공합니다.
wintab api 바인딩의 바이너리는 버전관리에 포함되어있지 않으므로 직접 빌드해야 합니다.

바인딩을 빌드하기 위해서 다음과 같이 nw-gyp를 설치합니다.

```sh
npm install -g nw-gyp
```

nw-gyp가 설치되었다면 프로젝트 폴더에서 다음의 명령을 실행합니다.

```sh
cd wintab
nw-gyp configure --target=0.9.2
nw-gyp build
```
이상이 완료되면, 프로젝트 폴더를 통째로 node-webkit 실행파일(`nw.exe`)에 드래그하면 프로그램이 실행됩니다.


소프트웨어 라이센스
---
The MIT License (MIT)

Copyright (c) 2014, JongChan Choi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
