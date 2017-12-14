<template>
  <div>

    <div class="profile-field">
      <div class="profile-label">头像</div>
      <div class="profile-value">
        <div class="image" style="width: 1.6rem;height: 1.6rem;">
          <img :src="profile.headimg">
        </div>
      </div>
    </div>
    <div class="profile-field mgb">
      <div class="profile-label">背景</div>
      <div class="profile-value">
        <div class="image" style="width: 2.4rem;height: 1.6rem;"><img :src="profile.background"></div>
      </div>
    </div>
    <div @click="showPopup('username')" class="profile-field" icon-right="more">
      <div class="profile-label">昵称</div>
      <div class="profile-value">{{ profile.username }}</div>
    </div>
    <div @click="showPopup('gender')" class="profile-field" icon-right="more">
      <div class="profile-label">性别</div>
      <div class="profile-value">{{ profile.gender }}</div>
    </div>
    <div @click="showPopup('month')" class="profile-field" icon-right="more">
      <div class="profile-label">生日</div>
      <div class="profile-value">{{ profile.birthday }}</div>
    </div>
    <div @click="showPopup('motto')" class="profile-field" icon-right="more">
      <div class="profile-label">个性签名</div>
      <div class="profile-value">{{ profile.motto }}</div>
    </div>
    <mt-popup class="profile-popup" position="right" :value="!!current" @input="onPopupVisibleChange">
      <div v-if="current === 'username' || current === 'motto'">
        <x-field v-model="editValue"></x-field>
      </div>
      <x-button
        v-if="current === 'username' || current === 'motto'"
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
      <div class="profile-popup-list" v-if="current === 'month'">
        <x-cell v-for="(month, index) in months" :key="month" @click.native="onSelectMonth(index)" bordered>
          <div>{{ month }}</div>
          <x-icon type="next_page" slot="right"></x-icon>
        </x-cell>
      </div>
      <div class="profile-popup-list" v-if="current === 'day'">
        <x-cell v-for="d in days" :key="d" @click.native="onSelectDay(d)" bordered>
          <div>{{ d }}号</div>
          <x-icon type="next_page" slot="right"></x-icon>
        </x-cell>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  const Gender = {
    0: '未知',
    1: '男',
    2: '女'
  }
  export default {
    data: function () {
      return {
        profile: {
          avatar: '',
          background: '',
          username: '',
          gender: '',
          birthday: '',
          motto: ''
        },
        current: '',
        editValue: '',
        months: [
          '1月', '2月', '3月', '4月', '5月', '6月',
          '7月', '8月', '9月', '10月', '11月', '12月'
        ],
        selectedMonthIndex: 0
      }
    },
    computed: {
      days () {
        return this.$utils.getMonthDays(this.selectedMonthIndex + 1)
      }
    },
    mounted () {
      this.fetchProfile()
    },
    methods: {
      fetchProfile () {
        this.$http.withLoading('/api/users').then(res => {
          this.profile.avatar = res.data.headimg
          this.profile.background = res.data.background
          this.profile.username = res.data.username
          this.profile.gender = Gender[res.data.sex]
          this.profile.birthday = this.formatBirthday(res.data.birthday)
          this.profile.motto = res.data.motto
        })
      },
      initUpload () {

      },
      formatBirthday (st) {
        if (!st) return ''
        const date = new Date(st * 1000)
        return (date.getMonth() + 1) + '月' + date.getDate() + '号'
      },
      showPopup (key) {
        this.current = key
        this.editValue = this.profile[key]
      },
      onSelectMonth (monthIndex) {
        this.selectedMonthIndex = monthIndex
        this.current = 'day'
      },
      onSelectDay (day) {
        const birthday = (this.selectedMonthIndex + 1) + '月' + day + '日'
        if (birthday === this.profile.birthday) {
          this.current = ''
          return
        }

        const m = ('00' + (this.selectedMonthIndex + 1)).slice(-2)
        const d = ('00' + day).slice(-2)
        this.updateProfile('birthday', new Date(m + '-' + d) / 1000)
      },
      genderChange (val) {
        if (this.profile.gender === val) {
          this.current = ''
          return
        }
        this.updateProfile('sex', val === '男' ? 1 : 2)
      },
      save () { // motto or username
        if (this.profile[this.current] === this.editValue) {
          this.current = ''
          return
        }
        this.updateProfile(this.current, this.editValue)
      },
      updateProfile (key, value) {
        const data = {[key]: value}
        this.$http.withLoading({
          url: '/api/users',
          data: data,
          method: 'post'
        }).then(() => {
          // this.profile[this.current] = this.editValue
          this.fetchProfile()
          this.current = ''
        })
      },
      onPopupVisibleChange (visible) {
        if (!visible) this.current = ''
      }
    }
  }
</script>
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

  .profile-popup-list {
    overflow: auto;
    height: 100%;
  }
</style>
