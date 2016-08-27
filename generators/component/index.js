'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    this.argument('name', { type: String, required: true });
  },
  _welcome: function () {
    this.log(yosay(
      chalk.red('Welcome!') + '\n' +
      chalk.yellow('You\'re using subgenerator of gulp-angular for scaffolding an application with Angular and Gulp! ')
    ));
  },
  initializing: function () {
    // welcome message.
    // this._welcome();
    // angularjs app name
    this.appName = require(this.destinationRoot() + '/package.json').name;
  },

  prompting: function () {
    var done = this.async();
    var prompts = [
      {
        "name": "componentName",
        "type": "input",
        "message": "the component name",
        "default": this.name
      }
    ];

    this.prompt(prompts, function (props) {

      this.props = props;
      done();

    }.bind(this));
  },

  configuring: function () {
    // body...
  },

  writing: function () {
    var destinationfolder = ("src/app/components/" + this.props.componentName + '/').replace(/\/+/g, '/');
    var componentName = this.props.componentName;
    var data = {
      appName: this.appName,
      controlerName: _.capitalize(this.props.viewName + 'Controller'),
      className: _.kebabCase(componentName),
      directiveName: componentName,
      templateUrl: 'app/components/' + componentName + '/' + componentName + '.html',
      directiveLink: componentName + 'Link',
      directiveController: componentName + 'Controller',
      serviceName: componentName,
      filterName: componentName
    }
    this.fs.copyTpl(
      this.templatePath('component.less'),
      this.destinationPath(destinationfolder + componentName + '.less'),
      data
    );
    this.fs.copyTpl(
      this.templatePath('component.directive.js'),
      this.destinationPath(destinationfolder + componentName + '.directive.js'),
      data
    );
    this.fs.copyTpl(
      this.templatePath('component.html'),
      this.destinationPath(destinationfolder + componentName + '.html'),
      data
    );
  },

  conflicts: function () {
    // body...
  },

  install: function () {
    // body...
  },

  end: function () {
    this.log(yosay(
      chalk.red('goodbye!') + '\n' +
      chalk.yellow('thank you for using gulp-angular-sub')
    ));
  }
});
