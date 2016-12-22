$(function () {
    lbsSearch.loadMap();
});
var lbsSetting = {};
lbsSetting.key = 'fcc3281785d43c60dde286321af8c72b';
lbsSetting.tableid = '584eb98eafdf520ea8cbee3a';
lbsSetting.bdMap = null;
lbsSetting.mapZoom = 18;
lbsSetting.geotable_id = 116417;
lbsSetting.currentCity = '深圳市';
lbsSetting.currentLng = 114.066112;
lbsSetting.currentLat = 22.548515;
lbsSetting.geoPoint = null;
lbsSetting.geoRadius = 30;
lbsSetting.pointChange = true;
lbsSetting.polyline = null;
var lbsCloud = {
    postLBS: function (url, type, data, callback) {
        console.log(type);
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'jsonp',
            success: function (data) {
                if (typeof callback === 'function') {
                    callback(data);
                }
            },
            error: function () {

            }
        });
    },
    //创建表
    createTable: function () {
        var url = 'http://yuntuapi.amap.com/datamanage/table/create';
        var data = {
            name: 'geotest',
            key: lbsSetting.key
        };
        $.ajax({
            type: 'post',
            url: url,
            data: data,
            dataType: 'jsonp',
            success: function (data) {
                console.log(data);
            },
            error: function () {

            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            }
        });
    },
    //创建数据
    createData: function () {
        var url = 'http://yuntuapi.amap.com/datamanage/data/create';
        var data = {
            data: {
                "_name": "御兴大厦",
                "_location": "113.873168,22.781384",
                "_address": "福前路22号附近",
                "_uid": 5
            },
            loctype: 2,
            tableid: lbsSetting.tableid,
            key: lbsSetting.key
        };
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            dataType: 'jsonp',
            success: function (data) {
                console.log(data);
            },
            error: function () {

            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            }
        });
    },
    //创建数据（批量） 
    batchcreateData: function () {
        var url = 'http://yuntuapi.amap.com/datamanage/data/batchcreate';
        var data = {
            file: '.cvs',//新增的数据文件
            loctype: 2,//定位方式
            _name: '',//文件中代表”名称”
            _address: 2,//地址
            longitude: 2,//经度
            latitude: 2,//纬度
            coordtype: 2,//坐标类型
            tableid: lbsSetting.tableid,
            key: lbsSetting.key
        };
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            dataType: 'jsonp',
            success: function (data) {
                console.log(data);
            },
            error: function () {

            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-type", "multipart/form-data");
            }
        });
    },
    //更新数据
    updateData: function () {
        var url = 'http://yuntuapi.amap.com/datamanage/data/update';
        var data = {
            data: {
                "_id": 1,
                "_name": "御兴大厦",
                "coordtype": 2,
                "_location": "113.873168,22.781384",
                "_address": "福前路22号附近",
                "_uid": 5
            },
            loctype: 2,
            tableid: lbsSetting.tableid,
            key: lbsSetting.key
        };
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            dataType: 'jsonp',
            success: function (data) {
                console.log(data);
            },
            error: function () {

            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            }
        });
    },
    //删除数据（单条/批量） 
    deleteData: function () {
        var url = 'http://yuntuapi.amap.com/datamanage/data/delete';
        var data = {
            ids: '1,2',
            tableid: lbsSetting.tableid,
            key: lbsSetting.key
        };
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            dataType: 'jsonp',
            success: function (data) {
                console.log(data);
            },
            error: function () {

            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            }
        });
    },
    //批量创建进度查询
    batchImportstatus: function () {
        var url = 'http://yuntuapi.amap.com/datamanage/batch/importstatus';
        var data = {
            batchid: 1,
            tableid: lbsSetting.tableid,
            key: lbsSetting.key
        };
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            dataType: 'jsonp',
            success: function (data) {
                console.log(data);
            },
            error: function () {

            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            }
        });
    }
};
window.initMap = function () {
    lbsSetting.bdMap = new AMap.Map('J_Map', {
        center: [lbsSetting.currentLng, lbsSetting.currentLat],
        zoom: lbsSetting.mapZoom
    });
    lbsSearch.localGeo('大厦');
    lbsSearch.districtGeo();
    lbsSearch.getLocation();
    lbsSearch.lbsEvent();
};
var lbsSearch = {
    ajaxLBS: function (url, data, callback) {
        $.ajax({
            type: 'GET',
            url: url,
            data: data,
            dataType: 'jsonp',
            success: function (data) {
                if (typeof callback === 'function') {
                    callback(data);
                }
            },
            error: function () {

            }
        });
    },
    loadMap: function () {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'http://webapi.amap.com/maps?v=1.3&key=' + lbsSetting.key + '&callback=initMap';
        document.body.appendChild(script);
    },
    //高精度IP定位
    getLocation: function () {
        lbsSetting.aMap.plugin('AMap.Geolocation', function () {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                buttonOffset: new AMap.Pixel(10, 10)//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            });
            lbsSetting.aMap.addControl(geolocation);
            geolocation.getCurrentPosition();
            //返回定位信息
            AMap.event.addListener(geolocation, 'complete', function (data) {
                var pos = data.position
                lbsSetting.currentLng = pos.getLng();
                lbsSetting.currentLat = pos.getLat();
                mapHandler.aroundSearch();
            });
            //返回定位出错信息
            AMap.event.addListener(geolocation, 'error', function (data) {
                if (data.info == 'NOT_SUPPORTED') {
                    console.log('当前浏览器不支持定位功能');
                }
                else {
                    console.log(data.message);
                }
            });
        });
    },
    geoMarker: function () {
        lbsSetting.bdMap.clearOverlays();
        var opts = {
            position: lbsSetting.geoPoint,
            offset: new BMap.Size(-8, -6)
        }
        var label = new BMap.Label('<span class="geo-marker"></span>', opts);
        label.setStyle({
            border: 0,
            width: '13px',
            height: '13px',
            'background-color': 'transparent'
        });
        lbsSetting.bdMap.addOverlay(label);
        var circle = new BMap.Circle(lbsSetting.geoPoint, lbsSetting.geoRadius);
        circle.setStrokeWeight(1);
        lbsSetting.bdMap.addOverlay(circle);
    },
    //本地检索请求
    localGeo: function (key) {
        var url = 'http://yuntuapi.amap.com/datasearch/local';
        var data = {
            keywords: key,
            city: lbsSetting.currentCity,
            filter: 'type:酒店+star:[3,5]',
            sortrule: '_uid:1',//排序规则 1 （升序）0 （降序）
            page: 0,//分页索引，当前页数
            limit: 10,//分页数据条目数
            tableid: lbsSetting.tableid,
            key: lbsSetting.key
        };
        this.ajaxLBS(url, data, function (json) {
            console.log(json);
        })
    },
    //周边检索
    boundGeo: function (key) {
        var url = 'http://yuntuapi.amap.com/datasearch/around';
        var lng = parseFloat(lbsSetting.currentLng).toFixed(6);
        var lat = parseFloat(lbsSetting.currentLat).toFixed(6);
        var bounds = lng + ',' + lat;
        var data = {
            keywords: key,
            center: bounds,
            radius: 1000,
            filter: 'type:酒店+star:[3,5]',
            sortrule: '_uid:1',
            page: 0,
            limit: 10,
            tableid: lbsSetting.tableid,
            key: lbsSetting.key
        };
        this.ajaxLBS(url, data, function (json) {
            console.log(json);
        })
    },
    //多边形检索
    polygonGeo: function (key) {
        var url = 'http://yuntuapi.amap.com/datasearch/polygon';
        var lng = parseFloat(lbsSetting.currentLng).toFixed(6);
        var lat = parseFloat(lbsSetting.currentLat).toFixed(6);
        var offset = 1;
        var bounds = (parseFloat(lng) - offset) + ',' + (parseFloat(lat) - offset) + ';' + (parseFloat(lng) + offset) + ',' + (parseFloat(lat) + offset);
        var data = {
            keywords: key,
            polygon: bounds,
            radius: 1000,
            filter: 'type:酒店+star:[3,5]',
            sortrule: '_uid:1',
            page: 0,
            limit: 10,
            tableid: lbsSetting.tableid,
            key: lbsSetting.key
        };
        this.ajaxLBS(url, data, function (json) {
            console.log(json);
        })
    },
    //id检索（poi详情检索）
    idGeo: function () {
        var url = 'http://yuntuapi.amap.com/datasearch/id';
        var data = {
            _id: 1,
            tableid: lbsSetting.tableid,
            key: lbsSetting.key
        };
        this.ajaxLBS(url, data, function (json) {
            console.log(json);
        });
    },
    //按条件检索数据（可遍历整表数据）
    listGeo: function () {
        var url = 'http://yuntuapi.amap.com/datamanage/data/list';
        var data = {
            filter: 'type:酒店+star:[3,5]',
            sortrule: '_uid:1',//排序规则 1 （升序）0 （降序）
            page: 0,//分页索引，当前页数
            limit: 10,//分页数据条目数
            tableid: lbsSetting.tableid,
            key: lbsSetting.key
        };
        this.ajaxLBS(url, data, function (json) {
            console.log(json);
        })
    },
    //省数据分布检索
    provinceGeo: function (key) {
        var url = 'http://yuntuapi.amap.com/datasearch/statistics/province';
        var data = {
            keywords: key,
            country: '中国',
            filter: 'type:酒店+star:[3,5]',
            tableid: lbsSetting.tableid,
            key: lbsSetting.key
        };
        this.ajaxLBS(url, data, function (json) {
            console.log(json);
        })
    },
    //市数据分布检索
    cityGeo: function (key) {
        var url = 'http://yuntuapi.amap.com/datasearch/statistics/city';
        var data = {
            keywords: key,
            province: '全国',
            filter: 'type:酒店+star:[3,5]',
            tableid: lbsSetting.tableid,
            key: lbsSetting.key
        };
        this.ajaxLBS(url, data, function (json) {
            console.log(json);
        })
    },
    //区县数据分布检索
    districtGeo: function (key) {
        var url = 'http://yuntuapi.amap.com/datasearch/statistics/district';
        var data = {
            keywords: key,
            city: '深圳市',
            province: '广东省',
            filter: 'type:酒店+star:[3,5]',
            tableid: lbsSetting.tableid,
            key: lbsSetting.key
        };
        this.ajaxLBS(url, data, function (json) {
            console.log(json);
        })
    },
    //html
    renderHtml: function (data) {
        lbsSetting.bdMap.clearOverlays();
        lbsSearch.geoMarker();
        $.each(data, function (i, json) {
            var location = json.location;
            var point = new BMap.Point(location[0], location[1]);
            var opts = {
                position: point,
                offset: new BMap.Size(-8, -8)
            }
            var label = new BMap.Label('<span class="geo-marker"></span>', opts);
            label.setStyle({
                border: 0,
                width: '13px',
                height: '13px',
                'background-color': 'transparent'
            });
            label.setTitle(json.address + '|' + json.title);
            label.removeEventListener('click');
            label.addEventListener('click', function () {
                var pos = this.getPosition();
                //lbsSearch.direction(pos.lng, pos.lat);
                lbsSearch.transit(pos.lng, pos.lat);
            });
            lbsSetting.bdMap.addOverlay(label);
        });
    },
    lbsEvent: function () {
        var aMap = lbsSetting.bdMap;
        aMap.on('dragend', function () {
            if (mapSetting.pointChange) {
                var center = aMap.getCenter();
                lbsSetting.boundGeo('');
            }
        });
        aMap.on('resize', function () {
            if (mapSetting.pointChange) {
                var center = aMap.getCenter();
                lbsSetting.boundGeo('');
            }
        });
        aMap.on('zoomend', function () {
            if (mapSetting.pointChange) {
                var center = aMap.getCenter();
                lbsSetting.boundGeo('');
            }
        });
        $("#J_geolocation").click(function () {
            if (lbsSetting.geoPoint == null) return;
            lbsSetting.bdMap.centerAndZoom(lbsSetting.geoPoint, lbsSetting.mapZoom);
            lbsSearch.nearbyGeo();
        });
    },
    direction: function (lng, lat) {
        var url = 'http://api.map.baidu.com/direction/v1';
        var glng = parseFloat(lbsSetting.currentLng).toFixed(6);
        var glat = parseFloat(lbsSetting.currentLat).toFixed(6);
        lng = parseFloat(lng).toFixed(6);
        lat = parseFloat(lat).toFixed(6);
        var data = {
            origin: glat + ',' + glng,
            destination: lat + ',' + lng,
            mode: 'walking',
            region: lbsSetting.currentCity,
            output: 'json',
            key: lbsSetting.key
        };
        this.ajaxLBS(url, data, function (json) {
            if (json.status == '0') {
                lbsSetting.bdMap.clearOverlays();
                console.log(json);
                var result = json.result;
                var routes = result.routes;
                var steps = routes[0].steps;
                $.each(steps, function (i, data) {
                    var stepOriginLocation = data.stepOriginLocation;
                    var stepDestinationLocation = data.stepDestinationLocation;
                    var pointA = new BMap.Point(stepOriginLocation.lng, stepOriginLocation.lat);
                    var pointB = new BMap.Point(stepDestinationLocation.lng, stepDestinationLocation.lat);
                    var polyline = new BMap.Polyline([pointA, pointB], {
                        strokeColor: 'blue',
                        strokeWeight: 3,
                        strokeOpacity: 0.5
                    });

                    polyline.disableMassClear();
                    lbsSetting.bdMap.addOverlay(polyline);
                });
            }
        })
    },
    transit: function (lng, lat) {
        var url = 'http://api.map.baidu.com/direction/v2/transit';
        var glng = parseFloat(lbsSetting.geoPoint.lng).toFixed(6);
        var glat = parseFloat(lbsSetting.geoPoint.lat).toFixed(6);
        lng = parseFloat(lng).toFixed(6);
        lat = parseFloat(lat).toFixed(6);
        var data = {
            origin: glat + ',' + glng,
            destination: lat + ',' + lng,
            output: 'json',
            key: lbsSetting.key
        };
        this.ajaxLBS(url, data, function (json) {
            if (json.status == '0') {
                lbsSetting.bdMap.clearOverlays();
                console.log(json);
                var result = json.result;
                var routes = result.routes;
                var steps = routes[0].steps;
                $.each(steps, function (i, data) {
                    var path = data.path;
                    var polyline = new BMap.Polyline({
                        strokeColor: 'blue',
                        strokeWeight: 3,
                        strokeOpacity: 0.5
                    });

                    polyline.setPath(path);
                    lbsSetting.bdMap.addOverlay(polyline);
                });
            }
        })
    }
}