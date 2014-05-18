var ui_setup = function () {
    var input = {
        'checkbox': function ($input, options) {
            with (options) {
                $input.prop('checked', get());
                $input.on('change', function () {
                    set($input.is(':checked'));
                });
            }
        },
        'color': function ($input, options) {
            with (options) {
                $input.val(get());
                $input.on('change', function () {
                    set($input.val());
                });
            }
        },
        'number': function ($input, options) {
            with (options) {
                $input.attr('min', min);
                $input.attr('max', max);
                $input.attr('step', step);
                $input.val(get());
                $input.on('keyup change', function () {
                    $input.val(Math.min(max, Math.max(min, $input.val())));
                    set($input.val());
                });
            }
        },
        'range': function ($input, options) {
            with (options) {
                $input.attr('min', min);
                $input.attr('max', max);
                $input.attr('step', step);
                $input.val(get());
                $input.on('change', function () {
                    set($input.val());
                });
            }
        }
    };
    function group(group, options) {
        options.forEach(function (option) {
            var $input = $('input[name="' + option.name + '"]', $(group));
            input[option.type]($input, option);
        });
    }
    group('.brush.tool.group', [
        {
            name: 'color',
            type: 'color',
            get: tool.brush.getColor,
            set: tool.brush.setColor
        },
        {
            name: 'size',
            type: 'number',
            get: tool.brush.getSize,
            set: function (val) {
                tool.brush.setSize(val);
                viewport.updateBrushPointer();
            },
            min: 0,
            max: 500,
            step: 1
        },
        {
            name: 'flow',
            type: 'range',
            get: tool.brush.getFlow,
            set: tool.brush.setFlow,
            min: 0,
            max: 1,
            step: 0.001
        },
        {
            name: 'spacing',
            type: 'number',
            get: function () {
                return tool.brush.getSpacing() * 100;
            },
            set: function (val) {
                tool.brush.setSpacing(val * 0.01);
            },
            min: 0,
            max: 10000,
            step: 1
        },
        {
            name: 'angle',
            type: 'number',
            get: tool.brush.getAngle,
            set: function (val) {
                tool.brush.setAngle(val);
                viewport.updateBrushPointer();
            },
            min: 0,
            max: 360,
            step: 1
        },
        {
            name: 'rotate',
            type: 'checkbox',
            get: tool.brush.getRotateToDirection,
            set: tool.brush.setRotateToDirection
        },
        {
            name: 'normal-spread',
            type: 'number',
            get: function () {
                return tool.brush.getNormalSpread() * 100;
            },
            set: function (val) {
                tool.brush.setNormalSpread(val * 0.01);
            },
            min: 0,
            max: 10000,
            step: 1
        },
        {
            name: 'tangent-spread',
            type: 'number',
            get: function () {
                return tool.brush.getTangentSpread() * 100;
            },
            set: function (val) {
                tool.brush.setTangentSpread(val * 0.01);
            },
            min: 0,
            max: 10000,
            step: 1
        }
    ]);
    group('.eraser.tool.group', [
        {
            name: 'size',
            type: 'number',
            get: tool.eraser.getSize,
            set: function (val) {
                tool.eraser.setSize(val);
                viewport.updateBrushPointer();
            },
            min: 0,
            max: 500,
            step: 1
        },
        {
            name: 'flow',
            type: 'range',
            get: tool.eraser.getFlow,
            set: tool.eraser.setFlow,
            min: 0,
            max: 1,
            step: 0.001
        },
        {
            name: 'spacing',
            type: 'number',
            get: function () {
                return tool.eraser.getSpacing() * 100;
            },
            set: function (val) {
                tool.eraser.setSpacing(val * 0.01);
            },
            min: 0,
            max: 10000,
            step: 1
        },
        {
            name: 'angle',
            type: 'number',
            get: tool.eraser.getAngle,
            set: function (val) {
                tool.eraser.setAngle(val);
                viewport.updateBrushPointer();
            },
            min: 0,
            max: 360,
            step: 1
        },
        {
            name: 'rotate',
            type: 'checkbox',
            get: tool.eraser.getRotateToDirection,
            set: tool.eraser.setRotateToDirection
        },
        {
            name: 'normal-spread',
            type: 'number',
            get: function () {
                return tool.eraser.getNormalSpread() * 100;
            },
            set: function (val) {
                tool.eraser.setNormalSpread(val * 0.01);
            },
            min: 0,
            max: 10000,
            step: 1
        },
        {
            name: 'tangent-spread',
            type: 'number',
            get: function () {
                return tool.eraser.getTangentSpread() * 100;
            },
            set: function (val) {
                tool.eraser.setTangentSpread(val * 0.01);
            },
            min: 0,
            max: 10000,
            step: 1
        }
    ]);
    group('.stabilizer.tool.group', [
        {
            name: 'level',
            type: 'number',
            get: croquis.getToolStabilizeLevel,
            set: croquis.setToolStabilizeLevel,
            min: 0,
            max: 50,
            step: 1
        },
        {
            name: 'weight',
            type: 'range',
            get: croquis.getToolStabilizeWeight,
            set: croquis.setToolStabilizeWeight,
            min: 0.2,
            max: 0.8,
            step: 0.001
        }
    ]);
};
