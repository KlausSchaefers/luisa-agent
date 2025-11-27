<template>

      <Dialog ref="dialog">
        <div class="luisa-padding luisa-dialog-content">
            <h2>App History</h2>
            <div v-if="loading" class="loading">Loading apps...</div>
            <div v-else-if="error" class="error">{{ error }}</div>
            <div v-else-if="apps.length === 0" class="no-apps">No apps found in history.</div>
            <table v-else class="history-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Update</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="app in apps" :key="app.name">
                        <td class="app-name">{{ app.name }}</td>
                        <td class="last-update">{{ formatDate(app.lastUpdate) }}</td>
                        <td class="actions">
                            <IconRotateClockwise2 @click="loadApp(app)" class="luisa-icon"></IconRotateClockwise2>
                            <IconTrash @click="deleteApp(app)" class="luisa-icon"></IconTrash>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      </Dialog>

</template>

<style lang="css" scoped>

.luisa-icon {
    cursor: pointer;
    margin-right: 0.5rem;
    width: 16px;
    height: 16px;
}
.history-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
}

.history-table th,
.history-table td {
    padding: 4px 0px;
    text-align: left;
}

.history-table th {
    font-weight: 600;
}

.last-update {
    color: #666;
    font-size: 0.9rem;
}

.history-table td.actions {
    white-space: nowrap;
    text-align: right;
}


.loading,
.error,
.no-apps {
    padding: 2rem;
    text-align: center;
    color: #666;
}

.error {
    color: #dc3545;
}
</style>


<script>

import Dialog from './Dialog.vue';
import HistoryService from '../services/HistoryService.js';
import {IconRotateClockwise2, IconTrash} from '@tabler/icons-vue';

export default {
    emits: ['update:modelValue', 'click', 'change', 'loadApp'],
    props: {
    },
    data() {
        return {
           apps: [],
           loading: false,
           error: null
        }
    },
    provide() {
        return {
            status: this.status
        }
    },
    components: {
        'Dialog'  : Dialog,
        'IconRotateClockwise2': IconRotateClockwise2,
        'IconTrash': IconTrash
    },
    computed: {

    },
    methods: {
        async show(e, callback) {
            this.$refs.dialog.show(e.target);
            this.onLoadCallback = callback;
            await this.loadApps();
        },
        
        async loadApps() {
            this.loading = true;
            this.error = null;
            try {
                this.apps = await this.historyService.listByLastUpdate();
            } catch (err) {
                console.error('Failed to load apps from history:', err);
                this.error = 'Failed to load apps from history. Please try again.';
            } finally {
                this.loading = false;
            }
        },
        
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        },
        
        loadApp(app) {
            this.$emit('loadApp', app);
            if (this.onLoadCallback) {
                this.onLoadCallback(app);
            }
            this.$refs.dialog.close();
        },
        
        async deleteApp(app) {
            if (confirm(`Are you sure you want to delete "${app.name}"?`)) {
                try {
                    const deleted = await this.historyService.delete(app.id);
                    if (deleted) {
                        // Reload the apps list
                        await this.loadApps();
                    } else {
                        this.error = 'App not found';
                    }
                } catch (err) {
                    console.error('Failed to delete app:', err);
                    this.error = 'Failed to delete app. Please try again.';
                }
            }
        }
    },
    watch: {

    },
    mounted() {
        this.historyService = new HistoryService()
        this.historyService.init()
    }
}
</script>
