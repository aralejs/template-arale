 'use strict';

exports.description = 'Create Arale module.';

exports.notes = '';

exports.warnOn = '*';

exports.template = function(grunt, init, done) {

  grunt.util._.extend(init.prompts, {
    family: {
      message: 'your CMD family',
      default: 'arale',
      warning: ''
    }
  });

  init.process({type: 'arale'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('family'),
    init.prompt('version', '1.0.0'),
    init.prompt('description', 'The best jQuery plugin ever.'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses', 'MIT')
  ], function(err, props) {
    var files = init.filesToCopy(props);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file, used by npm and grunt.
    init.writePackageJSON('package.json', {
      'family': props.family,
      'name': props.name,
      'version': '1.0.0',
      'root': props.family,
      'description': props.description ,
      'homepage': props.homepage,
      'author': props.author,
      'repository': '',
      'bugs': '',
      'licenses': ['MIT'],
      'dependencies': {},
      'tests': [props.name],
      'output': {}
    }, function(pkg, props) {
      ['family', 'root', 'tests', 'output', 'author'].forEach(function(prop) {
        if (prop in props) { pkg[prop] = props[prop]; }
      });
      return pkg;
    });

    // All done!
    done();
  });
};
