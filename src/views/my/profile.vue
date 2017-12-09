<template>
  <div>

    <div class="profile-field">
      <div class="profile-label">头像</div>
      <div class="profile-value"><x-avatar :src="avatar" size="1.6rem"></x-avatar></div>
    </div>
    <div class="profile-field mgb">
      <div class="profile-label">背景</div>
      <div class="profile-value">
        <div class="image" style="width: 2.4rem;height: 1.6rem;"><img :src="profileBackground" alt="背景"></div>
      </div>
    </div>
    <div @click="showPopup('nickname')" class="profile-field" icon-right="more">
      <div class="profile-label">昵称</div>
      <div class="profile-value">{{ nickname }}</div>
    </div>
    <div @click="showPopup('gender')" class="profile-field" icon-right="more">
      <div class="profile-label">性别</div>
      <div class="profile-value">{{ gender }}</div>
    </div>
    <div class="profile-field" icon-right="more">
      <div class="profile-label">生日</div>
      <div class="profile-value">{{ birthday }}</div>
    </div>
    <div @click="showPopup('signature')" class="profile-field" icon-right="more">
      <div class="profile-label">个性签名</div>
      <div class="profile-value">{{ signature }}</div>
    </div>
    <mt-popup class="profile-popup" position="right" :value="!!current" @input="onPopupVisibleChange">
      <div v-if="current === 'nickname' || current === 'signature'">
        <x-field v-model="editValue"></x-field>
      </div>
      <x-button
        v-if="current === 'nickname' || current === 'signature'"
        class="profile-popup-btn"
        type="primary"
        size="full"
        @click.native="save">
        保存
      </x-button>
      <x-radio-select
        v-if="current === 'gender'"
        :value="editValue"
        @input="genderChange"
        :options="[{ label: '男', value: '男' }, { label: '女', value: '女' }]">
      </x-radio-select>
    </mt-popup>
  </div>
</template>
<style>
  .profile-field {
    display: -webkit-box;
    display: flex;
    align-items: center;
    padding: 0.4267rem 0.48rem;
    background-color: #fff;
    border-bottom: 1px solid #f0f0f0;
  }
  .profile-label {
    flex: none;
  }
  .profile-value {
    position: relative;
    flex: 1;
    text-align: right;
    padding-right: 12px;
  }
  .profile-value > * {
    display: inline-block;
  }
  .profile-value::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    width: 9px;
    height: 16px;
    transform: translateY(-50%);
    background-image: url("/static/icon/ic_next_page.png");
    -webkit-background-size: cover;
    background-size: cover;
  }
  .profile-popup {
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
  }
  .profile-popup-btn {
    position: absolute;
    bottom: 0;
    left: 0;
  }
</style>
<script>
  export default {
    data: function () {
      return {
        avatar: '/static/img/avatar.png',
        profileBackground: '/static/img/profile_bg.png',
        nickname: 'hoga',
        gender: '男',
        birthday: '12月12日',
        signature: '没有丑小鸭，哪来的白天鹅！',
        current: '',
        editValue: ''
      }
    },
    methods: {
      showPopup: function (key) {
        this.current = key
        this.editValue = this[key]
      },
      save: function () {
        this[this.current] = this.editValue
        this.current = ''
      },
      genderChange: function () {
        this.gender = this.editValue
        this.current = ''
      },
      onPopupVisibleChange: function (visible) {
        if (!visible) this.current = ''
      }
    }
  }
</script>
