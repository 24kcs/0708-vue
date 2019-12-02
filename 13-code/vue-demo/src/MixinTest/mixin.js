export default {
  data () {
    return {
      name1:'小明'
    }
  },
  computed: {
    length(){
      return this.name1.length
    }
  }
 
}