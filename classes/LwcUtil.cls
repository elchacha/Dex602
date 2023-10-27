public with sharing class LwcUtil {

    @AuraEnabled
    public static String getLWCUrl(String lwcName,Map<String,String> parameters){
        List<String> params =new List<String>();
        String attributes='';
        if(parameters!=null){
            for(String key : parameters.keySet()){
                params.add('"'+key+'":"'+parameters.get(key)+'"');
            }
            attributes = ',"attributes":{'+String.join(params, ',')+'}';
        }
        String json = '{"componentDef":"c:'+lwcName+'"'+attributes+'}';
        return '/one/one.app#'+EncodingUtil.base64Encode(Blob.valueOf(json));
    }

    public static String getLWCUrl(String lwcName){
        return getLWCUrl(lwcName,null);
    }

    
     @AuraEnabled    
     public static String getLWCUrlFromRecordId(String lwcName,String recordId){
         Map<String,String> params = new Map<String,String> ();
         params.put('recordId',recordId);
         return getLWCUrl(lwcName,params);
         
     }


}