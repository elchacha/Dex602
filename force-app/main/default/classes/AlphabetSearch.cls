public with sharing class AlphabetSearch {
    @AuraEnabled
    public static  List<Certification_Held__c> searchRecord(String letter,String fieldName,String certificationId){
        String query = ' SELECT Id, Certified_Professional__r.Name, Certification__r.Name, Certified_Professional__r.Id, Certified_Professional__r.Email, Certified_Professional__r.Phone, Date_Achieved__c';
        query+=' FROM Certification_Held__c';
        query+=' WHERE '+fieldName+' LIKE \''+letter+'%\'';
        if(certificationId!=null){
            query+=' AND Certification__r.Id = :certificationId';
        }
        query+=' ORDER BY Certified_Professional__r.Name';

        System.debug(query);
        return Database.query(query);
    }
}