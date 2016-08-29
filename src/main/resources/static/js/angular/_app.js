"use strict";

/*Component ReactJS visualization with JSX*/
var Usuario			= React.createClass( {displayName: "Usuario",
	propTypes: {
		nombre		: React.PropTypes.string.isRequired,
		apellido	: React.PropTypes.string.isRequired
	},

	render: function(scope) {
		return React.createElement("span", null, "Hola ", this.props.nombre, " ", this.props.apellido);
	}
} );

/*Angular module*/
var app	= angular.module( 'app', ['react'] );

/*Assign default values in the Angular Controller
var User_ctrl	= function () {
	this.usuario = {
		nombre		: 'Clark',
		apellido	: 'Kent'
	}
}*/

/*Define AngularJS controller
app.controller( 'user_ctrl', ['$scope',User_ctrl]);*/

/*Define AngularJS Controller*/
app.controller( 'user_ctrl',['$scope', function ($scope) {
	this.usuario = {
		nombre		: 'Clark',
		apellido	: 'Kent'
	}
}]);


/*Define AngularJS directive*/
app.directive( 'usuario', function( reactDirective) {
  return reactDirective( Usuario );
} );
