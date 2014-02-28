$(document).ready(function(){
    var WishModel = Backbone.Model.extend({
        title:"",
        description: "",
        date: "",
        image:"",
        status: false
    });
    var WishCollection = Backbone.Collection.extend({
        model: WishModel
    });
    var wishcollection = new WishCollection();//collection for remaining wishes

    var DoneCollection = Backbone.Collection.extend({
        model: WishModel
    });
    var donecollection = new DoneCollection();//collection for done wishes
//--------------------------------------------------
    var WishView = Backbone.View.extend({//view class for remaining wishes
        tagName: "li",
        template: _.template($("#template").html()),
        events:{
            "click button.done-button": "doneWish",
            "click div.delete": "deleteWish"
        },
        initialize: function(){
            _.bindAll(this, "render", "deleteWish", "doneWish");
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render: function(){
            debugger;
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.find(".pic").css("background-image", "url('" + this.model.get("image") + "')");
            return this;
        },
        deleteWish: function(){
            this.model.destroy();
        },
        doneWish:function(){
            this.model.set({
                status: true
            });
            this.deleteWish();
        }
    });
    var DoneView = Backbone.View.extend({//view class for done wishes
        tagName: "li",
        template: _.template($("#template-done").html()),
        events:{
            "click div.restore": "restoreWish"
        },
        initialize: function(){
            _.bindAll(this, "render", "restoreWish", "deleteWish");
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render: function(){
            debugger;
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        deleteWish: function(){
            this.model.destroy();
        },
        restoreWish: function(){
            this.model.set({
                status: false
            });
            this.deleteWish();
        }
    });

    var AppView = Backbone.View.extend({//view class for app
        el: $("#app"),
        events: {
            "click button#add": "createWish"
        },
        initialize: function(){
            _.bindAll(this, "render", "createWish", "appendWish", "createDone", "appendDone", "createRestore");
            this.listenTo(wishcollection, "change", this.createDone);
            this.listenTo(donecollection, "change", this.createRestore);
            this.listenTo(donecollection, "add", this.appendDone);
            this.listenTo(wishcollection, "add", this.appendWish);
            this.render();
        },
        render: function(){
            this.$el.find("form").append("<button id = 'add' type = 'button'>Add!</button>");
        },
        createWish: function(){//create new wish model
            var wishmodel = new WishModel();
            var d = new Date();
            var date = d.getDate() + "/" + "0" + (d.getMonth() + 1) + "/" + d.getFullYear();
            var title = $("#title-input").val();
            var description = $("#description-input").val();
            var image = $("#image-input").val();
            wishmodel.set({
                title: title,
                description: description,
                date: date,
                image: image
            });
            $("input").val("");
            wishcollection.add(wishmodel);
        },
        appendWish: function(model) {//create remaining wish instance
            var wishview = new WishView({model: model});
            this.$("#list").append(wishview.render().el);
        },
        createDone: function(){//create done model and add it to done collection
            var findtrue = wishcollection.findWhere({ //find changed model in collection
                status: true
            });
            var wishmodel = new WishModel();
            wishmodel.set({
                title: findtrue.get("title"),
                description: findtrue.get("description"),
                date: findtrue.get("date"),
                image: findtrue.get("image")
            });
            donecollection.add(wishmodel);
        },
        appendDone: function(model){//create done wish instance
            var doneview = new DoneView({model: model});
            this.$("#done-list").append(doneview.render().el);
        },
        createRestore: function(){//create restore model and add it to remaining collection
            var findfalse = donecollection.findWhere({ //find changed model in collection
                status: false
            });
            var wishmodel = new WishModel();
            wishmodel.set({
                title: findfalse.get("title"),
                description: findfalse.get("description"),
                date: findfalse.get("date"),
                image: findfalse.get("image")
            });
            wishcollection.add(wishmodel);
        }
    });
    var appview = new AppView();
});

