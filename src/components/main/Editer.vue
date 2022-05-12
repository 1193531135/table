<template>
  <div>
    <editor id="tinymce" v-model="value" :init="init"></editor>
  </div>
</template>

<script>
import tinymce from "tinymce";
import editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver/theme";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/wordcount";
import "tinymce/icons/default";
export default {
  components: { editor },
  data() {
    return {
      init: {
        selector: "#tinymce",
        // language_url: "./zh_CN.js",
        // language: "zh_CN",
        skin_url: "./skins/ui/oxide",
        plugins: "link lists image code table wordcount",
        branding: false, // 去水印
        min_height: this.height || 500,
        paste_data_images: true,
        images_upload_handler: (blobInfo, success, failer) => {
          this.handleImageUpload(blobInfo, success, failer);
        },
      },
    };
  },
  watch:{
    // value(val){
    //   this.$emit('update:textvalue',val)
    // },
  },
  computed:{
    value:{
      get(){
        return this.textvalue
      },
      set(val){
        this.$emit('update:textvalue',val)
      }
    }
  },
  props:['textvalue','height'],
  methods:{
      handleImageUpload(blob,success,fail){
          if(fail){console.log('this is',fail)}
          let data = new FormData()
          data.append('image',blob.blob())
          this.$request('/oog202/manage/image/uploadRichText',data,res => {
              console.log(res)
          })
      }
  },
  mounted() {
    tinymce.init({});
  },
};
</script>

<style scoped>
.editor {
  width: 100%;
  height: 500px;
}
</style>