import React from 'react'
import './index.scss'

import PageTitle from 'component/page-title/index.jsx'
import { Button } from 'antd';

import { dojoRequire } from 'esri-loader'
import EsriLoader from 'esri-loader-react'

class tem extends React.Component{
  constructor(props) {
        super(props);
        let timeStample = new Date().getTime();
        this.state = {
            mapDivId: "mapdiv" + timeStample,
            mainMap: {}
        };
    }
  render(){
    const mapOptions = {
        // url: 'http://183.95.185.186/arcgis_js_v316_api/arcgis_js_api/library/3.16/3.16/init.js'
        url:'http://183.95.185.186/arcgis_js_v316_api/arcgis_js_api/library/3.16/3.16/init.js'
    }
    let flag = "HEHE";
    let mapStyle;
    if (flag !== "index") {
        //使用自适应大小
        mapStyle = { height: '400px', width: '430px' };
    } else {
        mapStyle = { height: '100vh', width: '70vw' };
    }
    return (
      <div id="page-wrapper">
        <PageTitle title="模板">
        </PageTitle>
        <div className="row">
          <div className="col-md-12">
            <div id={this.state.mapDivId} style={mapStyle}>
            </div>
            <EsriLoader options={mapOptions} ready={() => console.timeEnd('JSAPI loaded')} />

          </div>
        </div>
      </div>
    )
  }


  componentDidMount() {
      console.log(dojoRequire);
        dojoRequire(
            ['esri/layers/WebTiledLayer', 'esri/map'], (WebTiledLayer, EsriMap,InfoTemplate) => {

                this.state.mainMap = new EsriMap(this.state.mapDivId, {
                    autoResize: true,
                    zoom: 5,
                    maxZoom: 15,
                    center: [107.5, 27]
                });
                let thisMap=this;
                this.state.mainMap.on("load", function(){
                    thisMap.state.mainMap.graphics.enableMouseEvents();

                  });
                let bgMapUrl ='http://218.104.108.86:6080/arcgis/rest/services/China/ZJMapService/MapServer/0';
                //瓦片底图
                let baseMap = new WebTiledLayer(bgMapUrl);
                this.state.mainMap.addLayer(baseMap);//google地图
                this.setExtent({ minLat: "23", maxLat: "31", maxLon: "111.5", minLon: "103.5" });
            }
        );

    }
    addEventCallBack2Layer(layer,event, cb) {
        dojo.connect(layer,event, cb);
    }

    showInfoTemplate(info){
        //弹出infoWindow
        this.state.mainMap.infoWindow.show();
    }


    setExtent(scope) {
        // scope={"minLon":"0","maxLon":"10","minLat":"0","maxLat":"10"};
        console.info("setExtent");
        dojoRequire(["esri/geometry/Extent"], (Extent) => {
            let extent = new Extent({
                "xmin": parseFloat(scope.minLon),
                "ymin": parseFloat(scope.minLat),
                "xmax": parseFloat(scope.maxLon),
                "ymax": parseFloat(scope.maxLat),
                "spatialReference": {
                    "wkid": 4326
                }
            });
            this.state.mainMap.setExtent(extent);
        });


    }

    //增加图层；
    addLayer(layerName) {
        dojoRequire(
            ['esri/layers/GraphicsLayer'], (GraphicsLayer) => {
                let layer;
                layer = new GraphicsLayer();
                layer.id = layerName;
                this.state.mainMap.addLayer(layer);
                return layer;
            });
    }

    // 清除一个图层;
    clearLayer(layerName) {
        let layer = this.state.mainMap.getLayer(layerName);
        if (layer !== null)
            layer.clear();

    }

    getLayer(layerName) {
        return this.state.mainMap.getLayer(layerName);
    }

    //清除所有图层；
    clearAllLayers() {
        var arr = mainMap.graphicsLayerIds;
        arr.forEach((layer) => {
            this.state.mainMap.clearLayer(layer);
        });


    }

    ////增加图标marker
    addMarker(data) {
        // 添加marker到地图中，例如人员、设备、任务
        let locatedPoint = {
            "geometry": {
                "x": data.marker.lng,//经度
                "y": data.marker.lat,//纬度
                "spatialReference": {
                    "wkid": 4326
                },
            },
            "symbol": {
                "url": "/style/images/" + data.marker.type + ".png",
                "height": data.marker.height,
                "width": data.marker.width,
                "angle": data.marker.angle,
                "type": "esriPMS"
            }
        };

        // 检测是否设置infowindow信息
        if (data.infoTemplate !== null) {
            locatedPoint.geometry.infoTemplate = data.infoTemplate;

        }
        //新建地图信息
        dojoRequire(
            ['esri/graphic'], (Graphic) => {
                let gra = new Graphic(locatedPoint);
                if( data.marker.attrs===undefined)
                    data.marker.attrs={};
                // 设置属性
                if( data.marker.attrs===undefined) data.marker.attrs={};
                data.marker.attrs.graphic_id = data.marker.id;
                gra.setAttributes(data.marker.attrs);

                // 检测是否有当前marker所需添加到的图层，如果没有新建图层
                let layer = this.state.mainMap.getLayer(data.layer);
                if (layer === null) {
                    layer = this.state.mainMap.addLayer(data.layer);
                }
                return layer.add(gra);
                console.log("bigon");

            });


    }
    closeWindowInfo(evt){
        this.state.mainMap.infoWindow.hide();
    }
    showWindowInfo(evt){
        this.state.mainMap.infoWindow.setContent(evt.graphic.geometry.infoTemplate.content);
        this.state.mainMap.infoWindow.show(evt.screenPoint,this.state.mainMap.getInfoWindowAnchor(evt.screenPoint));
    }
    // 绘制轨迹
    addPath(pathParameters) {
        // 首先获取图层, 如果不存在则创建新图层
        let pathLayer = this.state.mainMap.getLayer(pathParameters.layer);
        // 创建路径
        let lineSymbol = {};
        let s=pathParameters.from;
        let e=pathParameters.to;
        let geo=[[s.x,s.y],[e.x,e.y]];
        lineSymbol.geometry = {
            "paths":[geo],
            "spatialReference": {
                "wkid": 4326
            }
        };
        lineSymbol.symbol = {
            "color": [255, 0, 0, 255],
            "width": 5,
            "type": "esriSLS",
            "style": "esriSLSSolid"
        };

        dojoRequire(
            ['esri/graphic'], (Graphic) => {
                // 添加路径到图层
                pathLayer.add(new Graphic(lineSymbol));
            });


    }
}

export default tem;
