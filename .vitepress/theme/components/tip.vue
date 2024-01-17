<template>
  <div class="custom-tip">
    <div class="custom-tip-title">TIP</div>
    <div class="custom-tip-content"><slot></slot></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less">
.custom-tip {
  margin-top: 20px;
  padding: 18px;
  border-radius: 6px;
  background-color: #646cff24;
  .custom-tip-content {
    font-size: 14px;
  }
  .custom-tip-content {
    p {
      margin: 0px !important;
    }
  }
  .custom-tip-title {
    font-size: 14px;
    margin-bottom: 8px;
    font-weight: 600;
  }
}
</style>
