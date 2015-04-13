if (Posts.find().count() === 0) {

  var now = new Date().getTime();

  var christianId = Meteor.users.insert({
    profile : {name : 'Christian Schulz'}
  });

  var christian = Meteor.users.findOne(christianId);

  var fabianId = Meteor.users.insert({
    profile : {name : 'Fabian Schulz'}
  });

  var fabian = Meteor.users.findOne(fabianId);

  var telescopeId = Posts.insert({
    title: 'Einleitung in Meteor',
    userId : christian._id,
    author : christian.profile.name,
    url: 'http://sachagreif.com/introducing-telescope',
    submitted : new Date(now - 7 * 3600 * 1000),
    commentsCount : 2,
    upvoters: [], votes : 0
    });

  Comments.insert({
    postId : telescopeId,
    userId : fabian._id,
    author : fabian.profile.name,
    submitted : new Date(now - 5 * 3600 * 1000),
    body : 'Hallo (: Interessantes Projekt!'
  });

  Comments.insert({
    postId : telescopeId,
    userId : christian._id,
    author : christian.profile.name,
    submitted : new Date(now - 10 * 3600 * 1000),
    body : 'Hey - vielen Dank hihi'
  });

  Posts.insert({
    title: 'Meteor',
    userId : christian._id,
    author : christian.profile.name,
    url: 'http://meteor.com',
    submitted : new Date(now - 12 * 3600 * 1000),
    commentsCount : 0,
    upvoters: [], votes : 0
  });

  Posts.insert({
    title: 'google',
    userId : fabian._id,
    author : fabian.profile.name,
    url: 'http://google.de',
    submitted : new Date(now - 12 * 3600 * 1000),
    commentsCount : 0,
    upvoters: [], votes : 0
  });

  for (var i = 0; i < 10; i++) {
    Posts.insert({
      title : 'Test post #' + i,
      author : christian.profile.name,
      userId : christian._id,
      url : 'http://google.com/?=test-' + i,
      submitted : new Date(now - i * 3600 * 1000),
      commentsCount : 0,
      upvoters: [], votes : 0
    });
  }
}
