Component({
    data: {
        selected: 0,
        selectedColor: "#b4282d",
        color: "#666",
        list: [{
                "pagePath": "/pages/index/index",
                "iconPath": "/static/images/ic_menu_choice_nor.png",
                "selectedIconPath": "/static/images/ic_menu_choice_pressed.png",
                "text": "推荐"
            },
            {
                "pagePath": "/pages/service/service",
                "iconPath": "/static/images/ic_menu_msg_nor.png",
                "selectedIconPath": "/static/images/ic_menu_msg_pressed.png",
                "text": "寻缘"
            },
            {
                "pagePath": "/pages/my/my",
                "iconPath": "/static/images/ic_menu_me_nor.png",
                "selectedIconPath": "/static/images/ic_menu_me_pressed.png",
                "text": "我的"
            }
        ]
    },
    attached() {},
    methods: {
        switchTab(e) {
            const data = e.currentTarget.dataset
            const url = data.path
            wx.switchTab({
                url
            })
        }
    }
})