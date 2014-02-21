$(document).ready(function(){

	var Wishmodel = Backbone.Model.extend({
		description: "",
		date: "",
		urlpic: false,
		status: false
	});

	var Wishlist = Backbone.Collection.extend({
		model: Wishmodel
	});

	var WishView = Backbone.View.extend({
		tagName: "li",
        template: _.template($('#tmpl').html()),
		events: {
			"click div.delete": "removeWish",
            "change input.checkbox": "done"
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
			var index = Math.floor(Math.random()*10);
            this.$el.css({"background-color": Colors.schuffle(index), "width": (250 + index*17)});
            this.$el.find(".pic").css({"background-image": "url('" + this.model.get("urlpic") + "')"})

		},
        done: function(){
            this.model.status = true;
            this.stopListening();
            this.$el.css("background-color", "grey").find(".checkbox").prop('disabled', true);
        }
	});

	var WishlistView = Backbone.View.extend({
		el: $("#app"),
		events: {
			"click button": "addwish"
		},
		initialize: function(){
			_.bindAll(this, "render", "addwish", "appendwish");
			this.collection = new Wishlist();
            this.listenTo(this.collection, 'add', this.appendwish);
			this.render();
		},
		render: function(){
            this.$el.find("#panel").append("<button>Add a wish!</button>");
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
				this.collection.add(wish);			
		},
		appendwish: function(wish){
			var wishview = new WishView({
				model: wish
			});
			this.$("ul").append(wishview.render().el);
		}
		

	});

	/*wl = new WishListView();
	_(wishes).each(function(wish) { 
		wl.appendwish(wish); 
	})*/

	var wishlistview = new WishlistView();

});