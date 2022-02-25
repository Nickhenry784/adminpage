$(function (){
    $("#StudentModal").on("show.bs.modal", function(e) {
        var maLH = $(e.relatedTarget).data('todo').MaLH;
        var tenLH = $(e.relatedTarget).data('todo').TenLH;
        var MoTa = $(e.relatedTarget).data('todo').MoTa;
        var GhiChu = $(e.relatedTarget).data('todo').GhiChu;
        $(this).find("#MaLH").val(maLH);
        $(this).find("#TenLH").val(tenLH);
        $(this).find("#MoTa").val(MoTa);
        $(this).find("#GhiChu").val(GhiChu);
    });

    $("#exampleModalCenter").on("show.bs.modal", function(e) {
        var imageSrc = $(e.relatedTarget).attr('data-id');
        $this.find('.modal-body img').prop('src', imageSrc);
    });

    $("#productModal").on("show.bs.modal", function(e) {
        var maMH = $(e.relatedTarget).data('todo').MaMH;
        var tenMH = $(e.relatedTarget).data('todo').TenMH;
        var SL = $(e.relatedTarget).data('todo').SL;
        var DonGia = $(e.relatedTarget).data('todo').DonGia;
        var DVT = $(e.relatedTarget).data('todo').DVT;
        var GhiChu = $(e.relatedTarget).data('todo').GhiChu;
        var MaLH = $(e.relatedTarget).data('todo').MaLH;
        $(this).find("#MaMH").val(maMH);
        $(this).find("#TenMH").val(tenMH);
        $(this).find("#SL").val(SL);
        $(this).find("#DonGia").val(DonGia);
        $(this).find("#DVT").val(DVT);
        $(this).find("#GhiChu").val(GhiChu);
        $(this).find("#MaLH").val(MaLH);
    });
    $("#cartModal").on("show.bs.modal", function(e) {
        var MaHDB = $(e.relatedTarget).data('todo').MaHDB;
        var NgayBan = $(e.relatedTarget).data('todo').NgayBan;
        var Noidung = $(e.relatedTarget).data('todo').Noidung;
        var TenKH = $(e.relatedTarget).data('todo').TenKH;
        var MaTT = $(e.relatedTarget).data('todo').MaTT;
        $(this).find("#MaHDB").val(MaHDB);
        $(this).find("#NgayBan").val(NgayBan);
        $(this).find("#Noidung").val(Noidung);
        $(this).find("#TenKH").val(TenKH);
        $(this).find("#MaTT").val(MaTT);
    });
});

window.setTimeout(function() {
    $(".alert").remove();
}, 3000);