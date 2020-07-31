$(document).on('turbolinks:load', () => {

  //Drag&Drop
  $(function(){
    const buildFileField =(num) => {
      const field = `<label class="box-field field-${num}" data-index="${num}">
                        <i class="fas fa-camera"></i>
                        <input class="box__select" type="file" name="product[images_attributes][${num}][item]" id="product_images_attributes_${num}_item">
                      </label>`;
      return field;
    }

    let fileIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    //画像ファイルプレビュー表示のイベント追加 fileを選択時に発火するイベントを登録
    $('.box').on('change', 'input[type="file"]', function(e) {
      const targetIndex = $(this).parent().data('index');
      const file = e.target.files[0];
      reader = new FileReader();
      let box = $(".box");
      const dropbox = $(".box-field");
      const dropbox_no = dropbox.length

      // 画像ファイル判別し画像ファイル以外はfalse
      if(file.type.indexOf("image") < 0){
        return false;
      }
        // ファイル読み込みが完了した際のイベント登録
      reader.onload = (function(file) {
        return function(e) {
          let src = reader.result
          let html= `<div class='preview' data-image="${file.name}">
          <div class='preview__content'>
          <img src=${src} width="134" height="75" >
          </div>
          <div class='preview__delete', id='back'>削除</div>
          </div>`

          //box要素の前にhtmlを差し込む
          $(".dummy").before(html);
          let num = fileIndex.shift();
          box.append(buildFileField(dropbox_no));


          //写真追加によるviewの変更
          switch(dropbox_no) {
            case 10:
              $(".field-10").css({'display': 'none'})
              $(".field-9").css({'display': 'none'})
              break;
            case 9:
              $(".field-9").css({'width': '20%'})
              $(".field-8").css({'display': 'none'})
              break;
            case 8:
              $(".field-8").css({'width': '40%'})
              $(".field-7").css({'display': 'none'})
              break;
            case 7:
              $(".field-7").css({'width': '60%'})
              $(".field-6").css({'display': 'none'})
              break;
            case 6:
              $(".field-6").css({'width': '80%'})
              $(".field-5").css({'display': 'none'})
              break;
            case 5:
              $(".field-5").css({'width': '100%'})
              $(".field-4").css({'display': 'none'})
              break;
            case 4:
              $(".field-4").css({'width': '20%'})
              $(".field-3").css({'display': 'none'})
              break;
            case 3:
              $(".field-3").css({'width': '40%'})
              $(".field-2").css({'display': 'none'})
              break;
            case 2:
              $(".field-2").css({'width': '60%'})
              $(".field-1").css({'display': 'none'})
              break;
            case 1:
              $(".field-1").css({'width': '80%'})
              $(".field-0").css({'display': 'none'})
              break;
            case 0:
              dropbox.css({'width': '100%'})
              break;
          }


          //削除ボタンを押下した際の画像削除イベント
          $(document).on("click", '.preview__delete', function(){
            //Preview要素を取得
            let target_image = $(this).parent()

            //Preview要素を削除
            target_image.remove();
            const images_no = $(".preview").length;

            //写真追加によるviewの変更
            switch(images_no) {
              case 9:
                $(".field-9").css({'width': '20%'})
                $(".field-9").css({'display': 'block'})
                $(".field-10").remove()
                break;
              case 8:
                $(".field-8").css({'width': '40%'})
                $(".field-8").css({'display': 'block'})
                $(".field-9").remove()
                break;
              case 7:
                $(".field-7").css({'width': '60%'})
                $(".field-7").css({'display': 'block'})
                $(".field-8").remove()
                break;
              case 6:
                $(".field-6").css({'width': '80%'})
                $(".field-6").css({'display': 'block'})
                $(".field-7").remove()
                break;
              case 5:
                $(".field-5").css({'width': '100%'})
                $(".field-5").css({'display': 'block'})
                $(".field-6").remove()
                break;
              case 4:
                $(".field-4").css({'width': '20%'})
                $(".field-4").css({'display': 'block'})
                $(".field-5").remove()
                break;
              case 3:
                $(".field-3").css({'width': '40%'})
                $(".field-3").css({'display': 'block'})
                $(".field-4").remove()
                break;
              case 2:
                $(".field-2").css({'width': '60%'})
                $(".field-2").css({'display': 'block'})
                $(".field-3").remove()
                break;
              case 1:
                $(".field-1").css({'width': '80%'})
                $(".field-1").css({'display': 'block'})
                $(".field-2").remove()
                break;
              case 0:
                dropbox.css({'width': '100%'})
                dropbox.css({'display': 'block'})
                $(".field-1").remove()
                break;
            }
            })
          }
        })
        (file);
        reader.readAsDataURL(file);
    });
  });


  //文字数をカウント
  $('#count_name').on('input', function () {
    const count = $(this).val().length;
    $('.up_count').text(count);
  });
  $('#count_area').on('input', function () {
    const count = $(this).val().length;
    $('.up_counter').text(count);
  });
  //再読み込み時の文字数をカウント
  $('#count_name').trigger('input');
  $('#count_area').trigger('input');

  //SHOWPAGE画像きり変え
  $('.subImg').mouseover(function(e) {
    const url = $(this).attr("src");
    $('.mainImg').attr('src', url)
  })
  $('.subImg').on('click', function(){
    $('.mainImg').mouseover()
  })
});