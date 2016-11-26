var fs = require('fs');


fs.readFile('./TelemetryPacket_1.0.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now

    const TMCatalog = JSON.parse(data);


    fs.readFile('./Reporting_1.0.json', 'utf8', function (err, data) {
        if (err) throw err; // we'll not consider error handling for now

        const RepCatalog = JSON.parse(data);

        var aggregCatalog = {};
        var parameterAggregation = [];



        /*link.parameterOid = "mlk";
        aggreOid.oid = "fsdfsf";
        aggregation[0] = aggreOid;
        aggregation[1] = aggreOid;
        link.aggregations = aggregation;
        parameterAggregation[0] = link;
        parameterAggregation[1] = link;
        aggregCatalog.parameterAggregations = parameterAggregation;
        */
        var i = 0;
        for (var repIndex=0; repIndex<RepCatalog.Catalog.Items.length; repIndex++){
          var link = {};
          var ReportingId = RepCatalog.Catalog.Items[repIndex].Oid;
          link.parameterOid = ReportingId;
          var ReportingName = RepCatalog.Catalog.Items[repIndex].Name;
          var aggregation = [];
          var j = 0;
          
          for(var packetIndex=0; packetIndex<TMCatalog.Catalog.Items.length; packetIndex++){
            var packet = TMCatalog.Catalog.Items[packetIndex];
            var packetOid = packet.Oid;
            for(var compIndex=0; compIndex<packet.Components.length; compIndex++){
              var packetComponent = packet.Components[compIndex]
              var paramName = packetComponent.TelemetryPacketEntry['ts180.referenceRecord'].TargetItem.string;
              if(paramName == ReportingName){
                var aggreOid = {};
                aggreOid.oid = packetOid;
                aggregation[j] = aggreOid;
                j++;
              }
            }
          }
          //console.log(aggregation.length);
          //console.log(aggregation);
          link.aggregations = aggregation;
          parameterAggregation[i] = link;
          i++;
        }

        aggregCatalog.parameterAggregations = parameterAggregation;

        chaine = JSON.stringify(aggregCatalog);
        fs.writeFileSync("newCat.json", chaine, "UTF-8");

    });

});
