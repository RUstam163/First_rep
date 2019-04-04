let stores = [
    {
        id: 1,
        name: "Кожа на московском",
        goods: [
            {
                id: 1,
                name: "Перчатки кожаные",
                color: "белый",
                price: 500
            },
            {
                id: 2,
                name: "Сапоги зимние",
                color: "черный",
                price: 1000
            },
            {
                id: 3,
                name: "Сумка замшевая",
                color: "серый",
                price: 700
            },

        ]

    },
    {
        id: 2,
        name: "Барокко в Апельсине",
        goods: [
            {
                id: 4,
                name: "Сумка летняя",
                color: "белый",
                price: 5000
            },
            {
                id: 5,
                name: "Уги",
                color: "желтый",
                price: 2000
            },
            {
                id: 6,
                name: "Куртка",
                color: "серый",
                price: 7000
            },

        ]

    }
];

function selectMas(mas){
    for (let i = 0; i < mas.length; i++) {        
        $('select#shopName').append($(new Option(mas[i].name, value=i))); 
    }
}

$( "#shopName" ).change(function() {
    var shop = stores[$("#shopName").val()]
    var tbl = '<table border=1 id="table">';
    tbl += "<tr><th>id</th><th>Товар</th><th>Цвет</th><th>Цена</th><th>Изменить</th><th>Удалить</th></tr>";
    
    for (let i = 0; i < shop.goods.length; i++) {
        var goods = shop.goods[i];
  
            tbl += '<tr class="tr"' +'id='+ goods.id +'>';
            tbl += '<td class="g_id" >' + goods.id + "</td>";
            tbl += '<td class="g_name">' + goods.name + "</td>";
            tbl += '<td class="g_color">' + goods.color + "</td>";
            tbl += '<td class="g_price">' + goods.price + "</td>";
            tbl += "<td>" + '<input type="button" class="edit" value="Изменить">' + "</td>";
            tbl += "<td>" + '<input type="button" class="del" value = "Удалить">' + "</td>";
            tbl += "</tr>";   
                             
    }   
    
        tbl += "</table>";
        $("#table").html(tbl);

    $('.edit').on('click', function() {
        let trCollect = $(this).parent().parent().children('td');
            var form = '<form class="form">';
            form +='<input type="hidden" class="id_goods">'
            form += "<label>"+"Наиминование Товара"+'<input type="text" class="name_goods">' +"</label>"+"<br>";
            form += "<label>"+"Цвет Товара"+'<input type="text" class="color_goods">' +"</label>"+"<br>";
            form += "<label>"+"Цена Товара"+'<input type="text" class="price_goods">' +"</label>"+"<br>";
            form += '<input type="button" class="saveBut" value="Сохранить">';
            form += '</form>';
            $("#form").html(form); 
            $('.saveBut').attr('data-ID',trCollect[0].innerHTML);
            $('.name_goods').val(trCollect[1].innerHTML);
            $('.color_goods').val(trCollect[2].innerHTML);
            $('.price_goods').val(trCollect[3].innerHTML);          
            
        $('.saveBut').on('click', function() { 
            
            // var shop = stores[$("#shopName").val()]
            for (let i = 0; i < stores.length; i++) {
                if ($('.saveBut').attr('data-ID')==(stores[i].goods[i].id)) { 
                    $('.g_name').text($('.name_goods').val());
                    $('.g_color').text($('.color_goods').val());
                    $('.g_price').text($('.price_goods').val());
                    // console.log($('.g_name').text())      
    }         
            }
        });

    });
                      
    $('.del').on('click', function() {
        $(this).closest('tr').remove();
    });
});

selectMas(stores)
// console.log($('.g_name').text())
