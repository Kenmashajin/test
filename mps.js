//reference : http://angular-ui.github.io/bootstrap/#/accordion

'use strict';
(function(){                                 
	angular.module("pld.consulta.ageorf", ['wcPldCommons','pldServices'])
	.controller('consultaAGeoRfCtrl',['$scope','$rootScope','pldService','pldModel',function ($scope,$rootScope,pldService,pldModel) {
		console.debug('cleaning dataContainer');
		if($rootScope.pldModel==undefined)//verifica si la vista regresa de analisis
			pldService.LimpiaDatosContenedor($rootScope.settings);

	}])
	.controller('consultaAGeoRfPrincipalCtrl',['$scope','$rootScope','$state','$stateParams','pldModel','ngDialog','googleMapsGet','History','paisesSucursalesGet',function ($scope,$rootScope,$state,$stateParams,pldModel,ngDialog,googleMapsGet,History,paisesSucursalesGet){
		
		$scope.valuesTable=pldModel.valuesTable;
		$scope.configTable={
                search:true,
                pages:true,
                excel:true,
                pagination:true,
                tableName:$scope.pldTittle.pageHeader.title+' '+$scope.pldTittle.pageHeader.subtitle,
                filters:{},
                disabledcollumns:['LATITUDE','LONGITUDE']//se agrega esta opcion para excluir columnas del stored
            };
		
		$scope.rule=pldModel.rule;

		//INICIALIZACION DE VARIABLES
		$scope.message=pldModel.valuesTable.tableMessage;
		$scope.history=new History($scope);
		$scope.pais=pldModel.pais;
		$scope.histBusqueda=[];
		$scope.count=0;

		//Este deberia ser un servicio con dicha info
		//$scope.paisesLatLon=paisesSucursalesGet.PaisesInfo();

		console.debug('Análisis Geo Referencial::Controlador Busqueda');

		$scope.createHistoric = function(){

			$scope.history.add({
				pais      :($scope.pais==null)?''     :$scope.pais
			});

			$scope.callData();

		}

		$scope.callData = function(){
			console.debug('pais '+$scope.pais)
			console.debug('Nombre Pais:'+ $("#pais option:selected").text());

			/*$("#map").css("height",$("body").height())
       		google.maps.event.trigger(map, 'resize');
			 */


			//Definicion de variables
			$scope.showMap=true;
			$scope.markers = [];
			$scope.infoWindow = new google.maps.InfoWindow();

			//Limpiamos el mapa 
			$("#map").empty();

//			var countryInfo=_.findWhere($scope.paisesLatLon,{cvePais:$scope.pais});

			/******************************************Obtencion de la Posicion Inicial del país********************************************/
			console.debug("here");

			var paramsInit={
					keyTable:'paisesInit',
					params:{
						pais:($scope.pais==null || $scope.pais==undefined	|| $scope.pais==undefined)?0:$scope.pais,
						
					}
			};
			paisesSucursalesGet.consultaDescOrigenes(paramsInit, $rootScope.settings)
			.then(function (tableVO) {
			  $scope.message.showAnimation=false;
			  $scope.paisesLatLon=tableVO.jsonResult;
			  
			  var countryInfo=_.findWhere($scope.paisesLatLon,{cvePais:$scope.pais});

			  if(countryInfo!=undefined){
			  	//countryInfo.descripcion='México';
			  	countryInfo.cvePais=countryInfo.cvePais;
			  	countryInfo.latitud=parseFloat(countryInfo.latitud);
			  	countryInfo.longitud=parseFloat(countryInfo.longitud);
			  
			  	/*Se genera el mapa haciendeo uso de la libería JS para google maps invoando el Factory que configura el Mapa*/
			  	$scope.map =  new google.maps.Map(document.getElementById('map'), googleMapsGet.mapOptions(countryInfo));
			  }
			},function(parentVO){
			  $scope.message.showAnimation=false;
			  $scope.showMap=false;
			  $scope.message=parentVO;
			});
			
			console.debug("here after")
			
			//Este deberia ser un servicio con dicha info
			//var sucursales=paisesSucursalesGet.consultaSucursalesRiesgo();
			if($scope.showMap!=false){
				var params={
					keyTable:'sucursalesRiesgo',
					params:{
						pais:($scope.pais==null || $scope.pais==undefined	|| $scope.pais==undefined)?0:$scope.pais,
						anio:($scope.anio==null || $scope.anio==undefined	|| $scope.anio==undefined)?0:$scope.anio,
						mes:($scope.mes==null || $scope.mes==undefined		|| $scope.mes==undefined)?0:$scope.mes
					}
				};
				paisesSucursalesGet.consultaSucursalesRiesgo(params, $rootScope.settings)
				.then(function (tableVO) {
			  		$scope.message.showAnimation=false;
			  		$scope.sucursales=tableVO.jsonResult;
			  
			  		/*Se crean los marcadores para el mapa con las sucursales correspondientes*/
			 		_.each($scope.sucursales,function(item,indx){
				 		$scope.createMarker(item,(indx+2));
			 		});
			  
				},function(parentVO){
				 	$scope.sucursales.length=0;
				  	$scope.message.showAnimation=false;
				  	$scope.message=parentVO;
				});

				/*Se genera el mapa haciendeo uso de la libería JS para google maps invoando el Factory que configura el Mapa
				$scope.map =  new google.maps.Map(document.getElementById('map'), googleMapsGet.mapOptions(countryInfo));*/

			
			
				/*********************************************Tabla con informacion de las Sucursales**********************************************/
				//variables de la tabla
            	$scope.reloadTable=false;
            	
				$scope.valuesTable.tableMessage.showAnimation=true;//se ingresa a la bandera interna de la animacion de la tabla
				$scope.valuesTable.tableMessage.state.show=false;//se oculta el mensaje de error interno de la tabla
				$scope.valuesTable.totalRows=0;//oculta la tabla

				//SP: REM_ConsultaTOPSucursalesRiesgo

				paisesSucursalesGet.consultaSucursalesRiesgoTable(params, $rootScope.settings)
				.then(function (tableVO) {
				  $scope.reloadTable=true;
				},function(parentVO){
				  $scope.valuesTable.tableMessage.showAnimation=false;
					  $scope.valuesTable.tableMessage=parentVO;
				});
			
			  	/*Se crean los marcadores para el mapa con las sucursales correspondientes
			  	for (var i = 0; i < $scope.sucursales.length; i++){
					  $scope.createMarker(sucursales[i]);
			  	}*/
			}
		}


		/*********************************************FUNCIONES**************************************************/

		/*Funcion encargada de crear el marcador para cada sucursal
		 * @Params
		 * sucursal: Es un objeto con la informacion relacionada con la Sucursal pra la cual se generará el marcador*/
		$scope.createMarker = function (sucursal,radio){

			var redCircle = {
					path: google.maps.SymbolPath.CIRCLE,
					fillOpacity: 0.5,
					fillColor: "red",
					strokeOpacity: 1.0,
					strokeColor: "red",
					strokeWeight: 1.0,
					scale: radio
			};

			var marker = new google.maps.Marker({
				map: $scope.map,
				position: new google.maps.LatLng(sucursal.LATITUDE, sucursal.LONGITUDE),
				title: sucursal.NombreSucursal,
				icon:redCircle,
				//animation: google.maps.Animation.DROP
			});


			/*Creacion del contenedor para la gráfica de la sucursal*/
			marker.content = '<div id="container" class="infoWindowMarker"></div>';


			/*Progamacion del evento click en el que se define la creación de una gráfica de Highcharts sobre el contendio del infoWindow*/
			/*google.maps.event.addListener(marker, 'click', function(){
				$scope.infoWindow.setContent('<h3>' + marker.title + '</h3>' + marker.content);
				$scope.infoWindow.open($scope.map, marker);

				new Highcharts.Chart(googleMapsGet.chartTest());
			});*/

			$scope.markers.push(marker);
		}  

		$scope.mostrarHistorico = function(item){           
			$scope.history.setActiveItem(item);
			$("#map").empty();
			$scope.cargarScope();
		}

		$scope.cargarScope = function(){
			$scope.pais     =$scope.history.activeItem().pais,
			$scope.callData();
		}

		$scope.eliminarItem = function(item){

			$scope.history.deleteItem(item);
			if(item.active==true){
				$scope.cargarScope()
				$scope.callData();
			}
		}

	}]);

})(); 

Index.jsp
<%-- @CARGA API GOOGLE MAPS--%>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBzOaTfxhTpqQQa9q6cZD18fvkY2kqN-AQ"></script>
