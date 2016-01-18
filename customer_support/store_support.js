<script>   
    var city_address = {"cities": [
            {
                "city": "Ahmedabad",
                "address": "Shop No 6B Swastik Centre, Opposite Femina Town, C.G. Road,Navrangpara,Ahmedabad-380009",
                "phone": "079-40165427 /28 /29 /30 ",
                "coordinates": {
                    "lat": 23.038494,
                    "log": 72.561993
                }
            },
            {
                "city": "Bangalore",
                "address": "No. 101, 1st Floor, Prestige Infantry Court, Diagonally Opp Medinova Hospital, Near Sony Center, Infantry Road,Bangalore - 560 001",
                "phone": "080-40855353",
                "coordinates": {
                    "lat": 13.041352,
                    "log": 77.530518
                }
            },
            {
                "city": "Chennai",
                "address": "Suite No 202, 2nd Floor, Capital Towers, Kodambakkam High Road, Opp Kumarakom Restaurant, Nungambakkam,Chennai - 600 034",
                "phone": "044-4210 5353",
                "coordinates": {
                    "lat": 13.12997,
                    "log": 80.175819
                }
            },
            {
                "city": "Cochin",
                "address": "1st Floor,Landmark Enclave, Sahodaran Ayyappan Road, Valanjambalam, Near Medical Trust , Cochin - 682016",
                "phone": "0484-4060353",
                "coordinates": {
                    "lat": 10.019906,
                    "log": 76.388283
                }
            },
            {
                "city": "Gurgaon",
                "address": "1101, 11th Floor, Tower B, Unitech Cyber Park, Sector -39, Gurgaon - 122001",
                "phone": "0484-4060353",
                "coordinates": {
                    "lat": 28.426882,
                    "log": 77.031369
                }
            },
            {
                "city": "Hyderabad",
                "address": "No. 202, 2nd Floor, Summit House, Hill Fort Road, Road Adjacent to Kalanjali, Above Air Asia Office, Hyderabad â500 004",
                "phone": "040-4445 7777",
                "coordinates": {
                    "lat": 17.448595,
                    "log": 78.408394
                }
            },
            {
                "city": "Kolkata",
                "address": "53A,Mirza Ghalib Street, 01st Floor(Arihant Building)Beside: Hotel -V.I.P. International, Kolkata-700016",
                "phone": "033-4063-3281,82,83,84,85",
                "coordinates": {
                    "lat": 22.566464,
                    "log": 88.311882
                }
            },
            {
                "city": "Ludhiana",
                "address": "SCO - 136,Feroze Gandhi Market, Ludhiana, Punjab -141001",
                "phone": "0161-4673401/03/11-12/18-19",
                "coordinates": {
                    "lat": 30.925494,
                    "log": 75.926857
                }
            },
            {
                "city": "Mumbai",
                "address": "B2,202,2nd Floor,Marathon Innova,Marathon Nextgen Complex,Off. Ganpatrao Kadam Marg,Lower Parel (W) Mumbai-Maharashtra 400013",
                "phone": "022-42559696",
                "coordinates": {
                    "lat": 18.99818,
                    "log": 72.82459
                }
            },
            {
                "city": "Nagpur",
                "address": "Shop No. 013 ,Plot.No 1, Pratibha Sankul Apartment, North Ambazari Road, Bhagwaghar Layout ,Dharampeth, Nagpur - 440010",
                "phone": "0712-6646008 0712-6646009",
                "coordinates": {
                    "lat": 21.1588,
                    "log": 79.027405
                }
            },
            {
                "city": "New Delhi",
                "address": "P-15,2ND Floor,Outer Circle, C.P.New Delhi-110001",
                "phone": "9311075140/9311075145-47",
                "coordinates": {
                    "lat": 28.650223,
                    "log": 77.311478
                }
            },
            {
                "city": "Pune",
                "address": "Yatra.com I Shop No. 1/2, Gera Gardens, Next to St. Mira College, Koregaon Park, Pune - 411001",
                "phone": "020-65006748",
                "coordinates": {
                    "lat": 18.592887,
                    "log": 73.983994
                }
            },
            {
                "city": "Surat",
                "address": "Yatra online Pvt. Ltd., 201,217, Samarth Sarthi Complex, Parle Point, Surat - 395007",
                "phone": "0261 - 4045500/01/02/03",
                "coordinates": {
                    "lat": 21.252582,
                    "log": 72.911797
                }
            },
            {
                "city": "Bikaner",
                "address": "Yatra Travel World, B-46, Kalpatru Building, Near Panchshati Circle, Sadul Ganj, Bikaner - 334003, Rajasthan India",
                "phone": "0151-3295905 9414139783",
                "coordinates": {
                    "lat": 28.025622,
                    "log": 73.291168
                }
            }
        ]}
//console.log(sample);
    var map;
    var gmapMarker;
    var test_cord = [];
    var all_data=[];
    var infoWindow;
    var info_update;
    $(document).ready(function () {
        setTimeout(function () {
            var cityDD = $("#gmap_address").data('dd');
            if (cityDD) {
                cityDD.set("length", 0);
                for (var i in city_address.cities) {
                    cityDD.add(new Option(city_address.cities[i].city, city_address.cities[i].city));
                }
            }
            mapData();
            //for (var i in sample.cities) {
            //output+="<option>" + sample.cities[i].city +"</option>";
            //$("#gmap_address").append("<option>" + sample.cities[i].city +"</option>");
            //}
            gmap_initializing();
            gmapMarker.addListener("click", function (e) {
                infoBox();
            });
        }, 200)

    });
    $(document).on('change', '#gmap_address', function () {
        mapData();
        gmap_updater();
        infoBox();
    });
    function mapData() {
        var map_data = $('#gmap_address option:selected').val();
        $.each(city_address.cities, function (i, item) {
            var elem = city_address.cities[i].city;
            if (map_data == elem) {
                all_data[0] = "<span>" + city_address.cities[i].city + "</span>" + "<span>" + city_address.cities[i].address + "</span>" + "<span>" + city_address.cities[i].phone + "</span>";
                $("#data").html(all_data[0]);
                test_cord[0] = city_address.cities[i].coordinates.lat;
                test_cord[1] = city_address.cities[i].coordinates.log;
            }
        });
    }

    function gmap_initializing() {
        var location = new google.maps.LatLng(test_cord[0], test_cord[1]);
        var mapProp = {
            center: location,
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        map = new google.maps.Map(document.getElementById("map"), mapProp);
        gmapMarker = new google.maps.Marker({
            position: location,
            map: map,
        });
        infoWindow = new google.maps.InfoWindow();
        infoBox();
    }

    function gmap_updater() {
        //console.log(test_cord[0],test_cord[1]);
//console.log(gmapMarker);
        var custom_latlng = new google.maps.LatLng(test_cord[0], test_cord[1]);
        gmapMarker.setPosition(custom_latlng);
        map.setCenter(custom_latlng);
        map.setZoom(10);
    }

    function infoBox() {
        info_update ='<div id="infoContent">'+all_data[0]+'</div>';
        infoWindow.setContent(info_update);
        infoWindow.open(map, gmapMarker);
    }
//$("#gmap_address").html(output);
</script>
