import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Visitor tracking
export const trackVisitor = async (visitorData) => {
  try {
    const { data, error } = await supabase
      .from('visitors')
      .insert([visitorData])
      .select()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error tracking visitor:', error)
    return null
  }
}

// Get visitor analytics
export const getVisitorAnalytics = async () => {
  try {
    const { data, error } = await supabase
      .from('visitors')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return []
  }
}

// Portfolio management
export const updatePortfolioData = async (section, data) => {
  try {
    const { data: result, error } = await supabase
      .from('portfolio_data')
      .upsert({ section, data })
      .select()
    
    if (error) throw error
    return result
  } catch (error) {
    console.error('Error updating portfolio data:', error)
    return null
  }
}

export const getPortfolioData = async (section) => {
  try {
    const { data, error } = await supabase
      .from('portfolio_data')
      .select('data')
      .eq('section', section)
      .single()
    
    if (error) throw error
    return data?.data
  } catch (error) {
    console.error('Error fetching portfolio data:', error)
    return null
  }
}