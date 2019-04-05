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

function selectCreate(mas){
    
    $('<label>',{text: 'Выбор магазина', id: 'label_select'}).appendTo('#select_block');
    $('<select>', {
        class: 'select',
        id: 'select',
        change:function () {
            tableCreate(mas[$(this).val()]);
        }
    }).appendTo('#label_select');
    $('<option>', {text: 'Выберете магазин'}).appendTo('#select');
        for (var i = 0; i < mas.length; i++) {      
            $('.select').append($(new Option(mas[i].name, value=i))); 
        } 

}

selectCreate(stores)

function tableCreate(mas){ 
    console.log(mas.goods)                     
    $('#table').remove();
    $('#addButton').remove();
    $('#add_block').children().remove();
    $('<table>', {id: 'table', class: 'table', border: '1'}).appendTo('#block');
    $('<thead>', {id: 'thead', class: 'thead'}).appendTo('#table');
    $('<tr>', {id: 'tr_head', class: 'tr_head'}).appendTo('#thead');
    $('<th>', {text: 'ID'}).appendTo('#tr_head');
    $('<th>', {text: 'Товар'}).appendTo('#tr_head');
    $('<th>', {text: 'Цвет'}).appendTo('#tr_head');
    $('<th>', {text: 'Цена'}).appendTo('#tr_head');
    $('<th>', {text: 'Изменить'}).appendTo('#tr_head');
    $('<th>', {text: 'Удалить'}).appendTo('#tr_head');
    $('<tbody>', {id: 'tbody', class: 'tbody'}).appendTo('#table');
    $('<button>', {
        text: 'Добавить товар',
        id: 'addButton', 
        click: function(){
            $('#add_block').children().remove();
            $('<form>', { id: 'form', class: 'form'}).appendTo('#add_block');
            $('<label>',{text: 'Название товара', id: 'label_name'}).appendTo('#add_block');
            $('<label>',{text: 'Цвет', id: 'label_color'}).appendTo('#add_block');
            $('<label>',{text: 'Цена', id: 'label_price'}).appendTo('#add_block');
            $('#label_name').append($('<input>', {id: 'add_name_input', type: 'text'}));
            $('#label_color').append($('<input>', {id: 'add_color_input', type: 'text'}));
            $('#label_price').append($('<input>', {id: 'add_price_input', type: 'text'}));
            $('<button>',{
                class:'save',
                text:'Добавить',
                'data-save-shop-id':mas.id,
                'data-save-goods-id': function() {for (let i = 0; i < stores.length; i++) {
                    return stores[i].goods[stores[i].goods.length-1].id}
                        
                    },
                click: saveAdd
            }).appendTo('#table');
            

        }
    }).appendTo('#add_block')

    $.each(mas.goods, function(index, data) {
        let tr = $('<tr>').appendTo('#tbody');
        $('<td>', {class: 'id', text:data.id}).appendTo(tr);
        $('<td>', {class: 'name', text:data.name}).appendTo(tr);
        $('<td>', {class: 'color', text:data.color}).appendTo(tr);
        $('<td>', {class: 'price', text:data.price}).appendTo(tr);
        tr.append($('<td>').append($('<button>', {
            class: 'edit',
            text: 'Изменить',
            'data-item-id': data.id,
            'data-shop-id': mas.id,
            click: formCreate 
        })));
        tr.append($('<td>').append($('<button>', {
            class: 'del',
            text: 'Удалить',
            click: del
        })));
    });
}
function formCreate(){
    let trCol = $(this).parent().parent().children('td');
        $('#form_block').children().remove();
        $('<form>', { id: 'form', class: 'form'}).appendTo('#form_block');
        $('<label>',{text: 'Название товара', id: 'label_name'}).appendTo('#form_block');
        $('<label>',{text: 'Цвет', id: 'label_color'}).appendTo('#form_block');
        $('<label>',{text: 'Цена', id: 'label_price'}).appendTo('#form_block');
        $('#label_name').append($('<input>', {id: 'name_input', type: 'text', value: trCol[1].innerHTML}));
        $('#label_color').append($('<input>', {id: 'color_input', type: 'text', value: trCol[2].innerHTML}));
        $('#label_price').append($('<input>', {id: 'price_input', type: 'text', value: trCol[3].innerHTML}));
        $('<button>',{
            class:'save',
            'data-save-shop-id': $(this).data('shopId'),
            'data-save-goods-id': $(this).data('itemId'),
            text:'Сохранить',
            click: save
        }).appendTo('#form_block');
}


function del(){
    $(this).closest('tr').remove();
}

function save(){
    let idSaveShop = $(this).data('saveShopId');
    let idSaveGoods = $(this).data('saveGoodsId');
    let nameSave = $('#name_input').val();
    let colorSave = $('#color_input').val();
    let priceSave = $('#price_input').val();    
    for (let i = 0; i < stores.length; i++) {
        if (idSaveShop==stores[i].id) {
            for (let z = 0; z < stores[i].goods.length; z++) {
                if (stores[i].goods[z].id == idSaveGoods) {
                    stores[i].goods[z].name = nameSave;
                    stores[i].goods[z].color = colorSave;
                    stores[i].goods[z].price = priceSave;
                    tableCreate(stores[i]);
                    $('#form_block').children().remove()
                } 
            }
        } 
    }      
}


function saveAdd(){
    let nameAdd = $('#add_name_input').val();
    let colorAdd = $('#add_color_input').val();
    let priceAdd = $('#add_price_input').val();
        
}

for (let i = 0; i < stores.length; i++) {
console.log(stores[i].goods[stores[i].goods.length-1].id)
    
}

    



