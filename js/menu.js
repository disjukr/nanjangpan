;(function () {
    var gui = require('nw.gui');
    function menu(items, option) {
        var menu = new gui.Menu(option);
        items.forEach(function (item) {
            menu.append(new gui.MenuItem(item));
        });
        return menu;
    }
    gui.Window.get().menu = menu([
    {
        type: 'normal',
        label: '파일',
        submenu: menu([
        {
            type: 'normal',
            label: '열기',
            click: function () {
                var selectOption = {
                    accept: '.jpg,.jpeg,.png',
                    multiple: false
                };
                LZADialog.selectFile(selectOption, function(file) {
                        console.log(file);
                    }
                );
            }
        },
        {
            type: 'normal',
            label: '저장',
            click: function () {
                var saveOption = {
                    filename: '난장판.png'
                };
                LZADialog.saveFileAs(saveOption, function(file) {
                        console.log(file);
                    }
                );
            }
        }
        ])
    }
    ], {
        type: 'menubar'
    });
})();
