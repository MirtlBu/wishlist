$(document).ready(function(){

	var Wishmodel = Backbone.Model.extend({
		description: "",
		date: "",
		urlpic: false,
		status: false
	});

	var Wishlist = Backbone.Collection.extend({
		model: Wishmodel,
        statusFalse: function(){
            return this.where({status: false});
        },
        statusTrue: function(){
            return this.where({status: true});
        }
	});
    var wishlist = new Wishlist();
//this view for list of wish
	var WishView = Backbone.View.extend({
		tagName: "li",
        template: _.template($('#tmpl').html()),
		events: {
			"click div.delete": "removeWish",
            "click button.done-button": "done"
		},
		initialize: function(){
			_.bindAll(this, "render", "style", "removeWish", "done");
            this.listenTo(this.model, 'destroy', this.remove);
		},
		render: function(){
            this.$el.html(this.template(this.model.toJSON()));
			this.style();
			return this;
		},
        removeWish: function(){
            this.model.destroy();//delete model
        },
		style: function(){
            this.$el.css("width", 250);
            this.$el.find(".pic").css({"background-image": "url('" + this.model.get("urlpic") + "')"});
		},
        done: function(){
            this.stopListening();
            this.remove();
            this.model.set({
                status: true
            });
        }
	});

//this view for list of DONE wish
    var WishViewDone = Backbone.View.extend({
        tagName: "li",
        template: _.template($('#tmpl-done').html()),
        events:{
            "click .restore": "restoreDone"
        },
        initialize: function(){
            _.bindAll(this, "render", "restoreDone", "removeDone");
            this.listenTo(this.model, 'change', this.remove);
        },
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        removeDone: function(){
            alert("a");
        },
        restoreDone: function(){
            this.stopListening();
            this.remove();
            this.model.set({
                status: false
            });
        }
    });

//this view for all app
	var WishlistView = Backbone.View.extend({
		el: $("#app"),
		events: {
			"click button#add-button": "addwish"
		},
        donelist: [],
		initialize: function(){
			_.bindAll(this, "render", "addwish", "appendOneWish", "appendDone");
            this.listenTo(wishlist, 'add', this.appendOneWish);
            this.listenTo(wishlist, 'change', this.appendDone);
			this.render();
		},
		render: function(){
            var a = $(window).innerHeight();
            this.$el.find("#bottom-panel").css("top", a - 50);
            this.$el.find("#top-panel").append("<button id = 'add-button' type = 'button'>wish</button>");
		},
		addwish: function(){
				var wish = new Wishmodel();
				var desc = $("input#text").val();
				var link = $("input#url").val();
				var d = new Date();
				var currentdate = d.getDate() + "/" + "0" + (d.getMonth() + 1) + "/" + d.getFullYear();
				wish.set({
					description: desc,
					date: currentdate,
					urlpic: link
				});
				$("input").val("");
				wishlist.add(wish);
		},
		appendOneWish: function(wish){
			var wishview = new WishView({
				model: wish
			});
			this.$("#list").append(wishview.render().el);
		},
        appendDone: function(){
            var list = wishlist.statusTrue();
            _.each(list, function(index){
                var wishviewdone = new WishViewDone({
                    model: index
                });
                $("#done-list").append(wishviewdone.render().el);
            }, this);
            var remaining = wishlist.statusFalse();
            _.each(remaining, function(index){
                debugger;
                if(index.hasChanged("status")){
                    this.appendOneWish(index);
                }
            }, this)
        }

	});
	var wishlistview = new WishlistView();

});