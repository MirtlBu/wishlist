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
			"click div.delete": "remove"
		},
		initialize: function(){
			_.bindAll(this, "render", "unrender", "style");
			this.model.bind("remove", this.unrender);
		},
		render: function(){
			$(this.el).html(
				 "<div class = 'desc'>" + this.model.get("description") + "</div>"
				+ "<div class = 'pic'></div>"
				+ "<div class = 'currentdate'>" + this.model.get("date") + "</div>"
				+ "<div class = 'delete'>X</div>");
			this.style();
			return this;
		},
		unrender: function(){
			$(this.el).remove();
		},
		style: function(){
			var colorlist = ["#00FFFF", "#FF8C00", "#FF1493", "#1E90FF", "#228B22", "#FFD700", "#ADFF2F", "#FF0000", "#CD853F", "#9370DB"];
			var colorindex = Math.floor(Math.random()*10);
			var fontindex = Math.floor(Math.random()*10);
			var sizeindex = fontindex*10;
			$(this.el).css("background-color", colorlist[colorindex]);
			$(this.el).css({width: (230 + sizeindex), height: (230 + sizeindex)});
			$(this.el).css("font-size", (((230 + sizeindex)*12)/230) + "px");
			if(!this.model.get("urlpic")){
				$(this.el).find(".pic").css("visibility", "hidden");
			}
            else{
                var that = this.el;
                var img = new Image();
                img.onload = function(){
                    if(this.height >= this.width){
                        $(that).find(".pic").css("background-size", 100 + "%");
                    }
                    else if(this.height <= this.width){
                        $(that).find(".pic").css("background-size", "auto " + 100 + "%");
                    }
                };
                img.src = this.model.get("urlpic");
                $(this.el).find(".pic").css("background-image", "url('" + this.model.get("urlpic") + "')");
            }
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
			this.collection.bind("add", this.appendwish);
			this.render();
		},
		render: function(){
			$(this.el).append("<ul></ul>");
			$(this.el).append("<div><form>Write your wish<input type = 'text' id = 'text' maxlength = '80' minlength = '1'><br />and paste image url<input type = 'text' id = 'url'></form><button>Add your wish!</button></div>");
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
		},
		

	});

	/*wl = new WishListView();
	_(wishes).each(function(wish) { 
		wl.appendwish(wish); 
	})*/

	var wishlistview = new WishlistView();

});