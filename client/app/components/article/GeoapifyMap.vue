<template>
    <div class="map-container" ref="mapContainer">
        <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div class="text-center">
                <div class="w-8 h-8 border-3 border-[#7ec8e3] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p class="text-xs text-[#555555]">Loading map...</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import maplibre from 'maplibre-gl'

const props = defineProps<{
    latitude: number
    longitude: number
    zoom?: number
    showMarker?: boolean
    markerText?: string
    interactive?: boolean
}>()

const config = useRuntimeConfig()
const mapContainer = ref<HTMLElement | null>(null)
const loading = ref(true)
let mapInstance: maplibre.Map | null = null
let mapScriptLoaded = ref(false)

// Load MapLibre CSS dynamically
const loadMapLibreCSS = () => {
    if (document.querySelector('#maplibre-css')) return
    
    const link = document.createElement('link')
    link.id = 'maplibre-css'
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/maplibre-gl@4.0.0/dist/maplibre-gl.css'
    document.head.appendChild(link)
}

// Initialize map
const initMap = async () => {
    if (!mapContainer.value || !props.latitude || !props.longitude) return
    
    loading.value = true
    
    try {
        // Clean up existing map
        if (mapInstance) {
            mapInstance.remove()
            mapInstance = null
        }
        
        const apiKey = config.public.geoapifyApiKey
        const mapStyle = 'https://maps.geoapify.com/v1/styles/osm-carto/style.json'
        
        const initialState = {
            lng: props.longitude,
            lat: props.latitude,
            zoom: props.zoom || 13
        }
        
        mapInstance = new maplibre.Map({
            container: mapContainer.value,
            style: `${mapStyle}?apiKey=${apiKey}`,
            center: [initialState.lng, initialState.lat],
            zoom: initialState.zoom,
            interactive: props.interactive !== false
        })
        
        // Add navigation controls
        mapInstance.addControl(new maplibre.NavigationControl(), 'top-right')
        
        // Add marker if requested
        if (props.showMarker !== false) {
            const markerText = props.markerText || '📍 Location'
            
            const popup = new maplibre.Popup({ offset: 25 })
                .setText(markerText)
            
            new maplibre.Marker({ color: '#7ec8e3' })
                .setLngLat([initialState.lng, initialState.lat])
                .setPopup(popup)
                .addTo(mapInstance)
        }
        
        // Map loaded
        mapInstance.on('load', () => {
            loading.value = false
        })
        
    } catch (error) {
        console.error('Error initializing map:', error)
        loading.value = false
    }
}

// Watch for prop changes
watch([() => props.latitude, () => props.longitude], () => {
    if (props.latitude && props.longitude) {
        initMap()
    }
})

onMounted(() => {
    loadMapLibreCSS()
    
    if (props.latitude && props.longitude) {
        nextTick(() => {
            initMap()
        })
    }
})

onUnmounted(() => {
    if (mapInstance) {
        mapInstance.remove()
        mapInstance = null
    }
})

// Expose method to recenter map
const recenterMap = (lat: number, lng: number, zoom?: number) => {
    if (mapInstance) {
        mapInstance.flyTo({
            center: [lng, lat],
            zoom: zoom || props.zoom || 13,
            essential: true
        })
    }
}

defineExpose({
    recenterMap,
    mapInstance
})
</script>

<style scoped>
.map-container {
    position: relative;
    height: 100%;
    width: 100%;
    min-height: 200px;
    background-color: #f3f4f6;
}

:deep(.maplibregl-map) {
    border-radius: inherit;
}

:deep(.maplibregl-ctrl-group) {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

:deep(.maplibregl-ctrl-group button) {
    width: 32px;
    height: 32px;
}

:deep(.maplibregl-popup-content) {
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 13px;
    font-weight: 500;
    color: #1a1a1a;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

:deep(.maplibregl-popup-tip) {
    display: none;
}
</style>