$(document).ready(function(){

	var Wishmodel = Backbone.Model.extend({
		description: "empty",
		date: "empty",
		urlpic: false,
		status: false
	});

	var Wishlist = Backbone.Collection.extend({
		model: Wishmodel
	});

	var WishView = Backbone.View.extend({
		tagName: "li",
		events: {
			"click div.delete": "removeWish"
		},
		initialize: function(){
			_.bindAll(this, "render", "style", "removeWish");
            this.listenTo(this.model, 'destroy', this.remove);
		},
		render: function(){
            $(this.el).html("<div class = 'delete'>X</div>" +
                            "<div class = 'date'>" + this.model.get("date") + "</div>" +
                            "<input class = 'checkbox' type = 'checkbox'>" +
                            "<div class = 'content'></div>");
            $(this.el).find(".content").html("<div class = 'description'>" + this.model.get("description") + "</div>"
                                           + "<div class = 'pic'></div>");
			this.style();
			return this;
		},
        removeWish: function(){
            this.model.destroy();//delete model
        },
		style: function(){
			var index = Math.floor(Math.random()*10);
            $(this.el).css({"background-color": Colors.schuffle(index), "width": (130 + index*17)});
            $(this.el).find(".pic").css("background-image", "url('" + this.model.get("urlpic") + "')");
		}
	});

	var WishlistView = Backbone.View.extend({
		el: $("body"),
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
			$(this.el).append("<ul></ul>");
			$(this.el).append("<div><form>I wish...<input type = 'text' id = 'text' maxlength = '80' minlength = '1'><br />and paste image url<input type = 'text' id = 'url'></form><button>Add your wish!</button></div>");
			_(this.collection.models).each(function(item){ //if collection is not empty? if get it from server?
				this.append(item);
			}.bind(this), this);
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
			$("ul", this.el).append(wishview.render().el);
		}
		

	});

	/*wl = new WishListView();
	_(wishes).each(function(wish) { 
		wl.appendwish(wish); 
	})*/

	var wishlistview = new WishlistView();

});