Posts = new Mongo.Collection('posts');

Posts.allow({
  update : function (userId, post) {
    return ownsDocument(userId, post);
  },
  remove : function (userId, post) {
    return ownsDocument(userId, post);
  }
});

validatePost = function (post) {
  var errors = {};

  if (!post.title)
    errors.title = "Ich flehe dich an - benenne deinen Post :´-(";

  if (!post.url)
    errors.url = "Was ist passiert, dass du so geworden bist?";

  return errors;
};

Posts.deny({
  update : function (userId, posts, fieldNames) {
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Posts.deny({
  update : function (userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);

    return errors.title || errors.url;
  }
});

Meteor.methods({
  postInsert : function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });

    var errors = validatePost(postAttributes);

    if (errors.title || errors.url)
      throw new Meteor.Error('invalid-post', "Du musst einen Title sowie eine URL festlegen");

    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if (postWithSameLink) {
      return {
        postExists : true,
        _id : postWithSameLink._id
      }
    }

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId : user._id,
      author : user.username,
      submitted : new Date(),
      commentsCount: 0,
      upvoters : [],
      votes : 0
    });

    var postId = Posts.insert(post);

    return {
      _id : postId
    }
  },

    upvote : function (postId) {
      check(this.userId, String);
      check(postId, String);

      var affected = Posts.update({
        _id : postId,
        upvoters : {$ne : this.userId}
      }, {
        $addToSet : {upvoters : this.userId},
        $inc : {votes : 1}
      });

      if (! affected)
        throw new Meteor.Error('invalid', "Du bist nicht berechtigt für diesen Post zu stimmen");
    }
});
