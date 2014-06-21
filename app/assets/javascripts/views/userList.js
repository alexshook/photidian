var UserList = Backbone.View.extend({
  el: '#list',
  initialize: function(){
    console.log('user list');
    this.listenTo(this.collection, 'add', this.addOne);
    this.listenTo(this.collection, 'reset', this.addAll);
  },
  addAll: function(){
    console.log("adall");
    this.collection.each(this.addOne,this);
  },
  addOne: function(user){
    // this.$el.prepend(userView.$el.hide());
    // userView.$el.slideDown(700);
    var userView = new UserView({model: user, id: user.id});
    this.$el.prepend(userView.$el);
  },
  filter: function(id){
    this.$el.empty();
    var singleUser = this.collection.get( parseInt(id) );
    this.addOne(singleUser);
  }
});
