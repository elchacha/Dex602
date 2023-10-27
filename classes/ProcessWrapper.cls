public class ProcessWrapper {
    
    @AuraEnabled
    public static ClassWrapperExample getWrapper(){
        return new ClassWrapperExample();
    }
    
    public class ClassWrapperExample{
        public String value;
        public Integer aInt;
		public Map<String,String> aMap;
        
        public ClassWrapperExample(){
            value='test String';
            aInt=12;
            aMap=new Map<String,String>();
            aMap.put('test','testMap');
        }
        
    }

}