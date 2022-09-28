<template>
  <div class="main-area">
    <h1>PDF去注解工具</h1>
    <el-upload
        drag action="#"
        v-loading="pdfProcessingState"
        element-loading-text="将在处理完后自动下载..."
        :on-change="onUploadChange"
        :auto-upload="false"
        accept="application/pdf">
      <el-icon class="el-icon--upload">
        <upload-filled/>
      </el-icon>
      <div class="el-upload__text">
        将pdf文件拖拽至此或 <em>点击上传</em>
      </div>
    </el-upload>
  </div>
  <!--  footer -->
  <div style="position: absolute; bottom: 10px; color: #888">
    &copy; ScientificRat
  </div>

</template>
<script>
export default {
  name: 'App'
}
</script>
<script setup>
import {UploadFilled} from '@element-plus/icons-vue'
import {ElMessage} from 'element-plus'
import axios from "axios"
import {ref} from "vue";

const pdfProcessingState = ref(false)


async function onUploadChange(uploadFile) {
  console.log(uploadFile)
  if (uploadFile.status === 'ready') {
    pdfProcessingState.value = true
    const formData = new FormData()
    formData.append('pdf_file', uploadFile.raw)
    try {
      const resp = await axios.post('/api/remove_annotation', formData, {
        headers: {
          'content-type': 'multipart/form-data'
        },
        responseType: 'blob'
      })
      _download(URL.createObjectURL(resp.data), uploadFile.name + '.clean.pdf')
    } catch (e) {
      console.log(e)
      ElMessage.error("网络故障，上传失败 " + JSON.stringify(e))
    } finally {
      pdfProcessingState.value = false
    }
  }
}


function _download(dataUrl, filename) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  link.click();
}
</script>

<style>
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
}

body {
  margin: 0
}

#app {
  display: flex;
  height: 100vh;
  justify-content: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main-area {
  padding: 10px;
  min-width: 0;
  max-width: 500px;
  flex-grow: 1;
  flex-basis: 500px;
  height: 100%
}
</style>
