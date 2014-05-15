;(function () {
    function checkbox($input, options) {
        with (options) {
            $input.prop('checked', get());
            $input.on('change', function () {
                set($input.is(':checked'));
            });
        }
    }
    function color($input, options) {
        with (options) {
            $input.val(get());
            $input.on('change', function () {
                set($input.val());
            });
        }
    }
    function number($input, options) {
        with (options) {
            $input.val(get());
            $input.attr('min', min);
            $input.attr('max', max);
            $input.attr('step', step);
            $input.on('keyup change', function () {
                set($input.val());
            });
        }
    }
    function range($input, options) {
        with (options) {
            $input.val(get());
            $input.attr('min', min);
            $input.attr('max', max);
            $input.attr('step', step);
            $input.on('change', function () {
                set($input.val());
            });
        }
    }
    var $brushGroup = $('.group.brush');
    var $brushColor = $('input[name="brush-color"]', $brushGroup);
    var $brushSize = $('input[name="brush-size"]', $brushGroup);
    var $brushFlow = $('input[name="brush-flow"]', $brushGroup);
    var $brushSpacing = $('input[name="brush-spacing"]', $brushGroup);
    var $brushAngle = $('input[name="brush-angle"]', $brushGroup);
    var $brushRotate = $('input[name="brush-rotate"]', $brushGroup);
    var $brushNormalSpread = $('input[name="brush-normal-spread"]', $brushGroup);
    var $brushTangentSpread = $('input[name="brush-tangent-spread"]', $brushGroup);
    color($brushColor, {
        get: tool.brush.getColor,
        set: tool.brush.setColor
    });
    number($brushSize, {
        get: tool.brush.getSize,
        set: function (val) {
            tool.brush.setSize(val);
            viewport.updateBrushPointer();
        },
        min: 0,
        max: 500,
        step: 1
    });
    range($brushFlow, {
        get: tool.brush.getFlow,
        set: tool.brush.setFlow,
        min: 0,
        max: 1,
        step: 0.001
    });
    number($brushSpacing, {
        get: function () {
            return tool.brush.getSpacing() * 100;
        },
        set: function (val) {
            tool.brush.setSpacing(val * 0.01);
        },
        min: 0,
        max: 10000,
        step: 1
    });
    number($brushAngle, {
        get: tool.brush.getAngle,
        set: function (val) {
            tool.brush.setAngle(val);
            viewport.updateBrushPointer();
        },
        min: 0,
        max: 360,
        step: 1
    });
    checkbox($brushRotate, {
        get: tool.brush.getRotateToDirection,
        set: tool.brush.setRotateToDirection
    });
    number($brushNormalSpread, {
        get: function () {
            return tool.brush.getNormalSpread() * 100;
        },
        set: function (val) {
            tool.brush.setNormalSpread(val * 0.01);
        },
        min: 0,
        max: 10000,
        step: 1
    });
    number($brushTangentSpread, {
        get: function () {
            return tool.brush.getTangentSpread() * 100;
        },
        set: function (val) {
            tool.brush.setTangentSpread(val * 0.01);
        },
        min: 0,
        max: 10000,
        step: 1
    });
})();
