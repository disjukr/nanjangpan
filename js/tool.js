var tool = {};
var selectTool = {};
;(function () {
    ;(function (tool) {
        tool.brush = new Croquis.Brush();
        tool.eraser = new Croquis.Brush();
    })(tool);
    var $toolSelectGroup = $('.group.tool-select');
    function select(option) {
        var toolName = option.name;
        var _selectTool = selectTool[toolName] = function () {
            croquis.setTool(tool[toolName]);
            croquis.setPaintingKnockout(!!option.knockout);
            $('.tool.group:visible').hide();
            option.opens.forEach(function (group) {
                $(group).show();
            });
        };
        var selector = 'button[name="' + option.name + '"]';
        $(selector, $toolSelectGroup).click(_selectTool);
    }
    function selects(options) {
        options.forEach(function (option) {
            select(option);
        });
    }
    selects([
        {
            name: 'brush',
            opens: [
                '.brush.tool.group',
                '.stabilizer.tool.group'
            ]
        },
        {
            name: 'eraser',
            opens: [
                '.eraser.tool.group',
                '.stabilizer.tool.group'
            ],
            knockout: true
        }
    ]);
})();
