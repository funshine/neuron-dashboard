<template>
  <div class="node-card south-drive-item-card" @click="goGroupPage">
    <div class="node-item-hd common-flex">
      <p class="south-drive-item-name ellipsis">{{ data.name }}</p>
      <div class="setup-item-handlers">
        <AComWithDesc :content="$t('config.deviceConfig')">
          <i class="iconfont iconsetting" @click.stop="goNodeConfig"></i>
        </AComWithDesc>
        <AComWithDesc :content="$t('common.delete')">
          <i class="iconfont icondelete" @click.stop="deleteDriver"></i>
        </AComWithDesc>
      </div>
    </div>
    <div>
      <div class="node-item-info-row common-flex">
        <div class="common-flex">
          <label>{{ $t('config.workStatus') }}:</label>
          <div>
            <svg class="iconfont icon-svg" aria-hidden="true">
              <use :xlink:href="`#${statusIcon}`" />
            </svg>
            <span>{{ statusText }}</span>
          </div>
        </div>
        <div class="common-flex">
          <emqx-switch v-model="nodeStartStopStatus" @click.stop />
        </div>
      </div>
      <div class="node-item-info-row">
        <label>{{ $t('config.connectionStatus') }}:</label>
        <span>{{ connectionStatusText }}</span>
      </div>
      <div class="node-item-info-row">
        <label>Plugin: </label>
        <span>{{ data.plugin }}</span>
      </div>
      <!-- <div class="node-item-info-row">
        <label>{{ $t('config.runningTime') }}:</label>
        <span>66</span>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import AComWithDesc from '@/components/AComWithDesc.vue'
import useDeleteDriver from '@/composables/config/useDeleteDriver'
import { useDriverStatus, useNodeStartStopStatus } from '@/composables/config/useDriver'
import type { PropType } from 'vue'
import { computed, defineEmits, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import type { DriverItemInList } from '@/types/config'

const props = defineProps({
  data: {
    type: Object as PropType<DriverItemInList>,
    required: true,
  },
})

const emit = defineEmits(['deleted', 'updated', 'toggleStatus'])
const router = useRouter()
const { countNodeStartStopStatus } = useNodeStartStopStatus()

const nodeStartStopStatus = computed({
  get() {
    return countNodeStartStopStatus(props.data)
  },
  set(val) {
    emit('toggleStatus', val)
  },
})
const { statusIcon, statusText, connectionStatusText } = useDriverStatus(props)

const goGroupPage = () => {
  router.push({
    name: 'SouthDriverGroup',
    params: {
      node: props.data.name,
    },
  })
}

const { delDriver } = useDeleteDriver()
const deleteDriver = async () => {
  await delDriver(props.data)
  emit('deleted')
}
const goNodeConfig = () => router.push({ name: 'SouthDriverConfig', params: { node: props.data.name } })
</script>

<style lang="scss">
.south-drive-item-card {
  background-color: #f3f3ff;
  label {
    display: inline-block;
  }
}
</style>
