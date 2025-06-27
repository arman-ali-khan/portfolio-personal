import { useEffect } from 'react'
import UAParser from 'ua-parser-js'
import { trackVisitor, isSupabaseAvailable } from '../lib/supabase'

export const useVisitorTracking = () => {
  useEffect(() => {
    const trackCurrentVisitor = async () => {
      // Skip tracking if Supabase is not configured
      if (!isSupabaseAvailable()) {
        console.log('Visitor tracking disabled - Supabase not configured');
        return;
      }

      try {
        // Get user agent info
        const parser = new UAParser()
        const result = parser.getResult()
        
        // Get IP and location info
        let ipData = {};
        try {
          const ipResponse = await fetch('https://ipapi.co/json/')
          ipData = await ipResponse.json()
        } catch (error) {
          console.log('Could not fetch IP data, using defaults');
          ipData = {
            ip: 'Unknown',
            country_name: 'Unknown',
            city: 'Unknown',
            region: 'Unknown',
            timezone: 'Unknown',
            org: 'Unknown'
          };
        }
        
        // Get screen info
        const screenInfo = {
          width: window.screen.width,
          height: window.screen.height,
          colorDepth: window.screen.colorDepth,
          pixelDepth: window.screen.pixelDepth
        }
        
        // Prepare visitor data
        const visitorData = {
          ip_address: ipData.ip || 'Unknown',
          country: ipData.country_name || 'Unknown',
          city: ipData.city || 'Unknown',
          region: ipData.region || 'Unknown',
          timezone: ipData.timezone || 'Unknown',
          isp: ipData.org || 'Unknown',
          browser: result.browser.name || 'Unknown',
          browser_version: result.browser.version || 'Unknown',
          os: result.os.name || 'Unknown',
          os_version: result.os.version || 'Unknown',
          device_type: result.device.type || 'desktop',
          device_model: result.device.model || 'Unknown',
          device_vendor: result.device.vendor || 'Unknown',
          screen_resolution: `${screenInfo.width}x${screenInfo.height}`,
          color_depth: screenInfo.colorDepth,
          pixel_depth: screenInfo.pixelDepth,
          user_agent: navigator.userAgent,
          language: navigator.language || 'Unknown',
          referrer: document.referrer || 'Direct',
          page_url: window.location.href,
          session_id: generateSessionId(),
          created_at: new Date().toISOString()
        }
        
        // Track visitor
        await trackVisitor(visitorData)
      } catch (error) {
        console.error('Error tracking visitor:', error)
      }
    }
    
    trackCurrentVisitor()
  }, [])
}

const generateSessionId = () => {
  return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now()
}