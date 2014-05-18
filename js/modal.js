var showModal;
var hideModal;

var modal_setup = function () {
    $modalZone = $('#modal-zone');
    $overlay = $('.overlay', $modalZone);
    showModal = function (modal) {
        $(modal, $modalZone).show();
        $modalZone.fadeIn(300);
    };
    hideModal = function (instantly) {
        var t = instantly === true ? 0 : 300;
        $modalZone.fadeOut(t, function () {
            $('modal:visible').hide();
        });
    };
    hideModal(true);
    $overlay.click(hideModal);
};
