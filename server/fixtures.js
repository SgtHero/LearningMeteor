if (Posts.find().count() === 0) {
  Posts.insert({
    title: 'Einleitung in Meteor',
    url: 'http://sachagreif.com/introducing-telescope'
  });
  Posts.insert({
    title: 'Meteor',
    url: 'http://meteor.com'
  });
  Posts.insert({
    title: 'google',
    url: 'http://google.de'
  });
}
