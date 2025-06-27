import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Only create client if environment variables are properly set
export const supabase = supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_url_here' && 
  supabaseAnonKey !== 'your_supabase_anon_key_here' 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Check if Supabase is available
export const isSupabaseAvailable = () => {
  return supabase !== null;
};

// Visitor tracking
export const trackVisitor = async (visitorData) => {
  if (!isSupabaseAvailable()) {
    console.log('Supabase not configured, skipping visitor tracking');
    return null;
  }

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
  if (!isSupabaseAvailable()) {
    console.log('Supabase not configured, returning empty analytics');
    return [];
  }

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
  if (!isSupabaseAvailable()) {
    console.log('Supabase not configured, cannot update portfolio data');
    return null;
  }

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
  if (!isSupabaseAvailable()) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('portfolio_data')
      .select('data')
      .eq('section', section)
      .single()
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
      throw error;
    }
    
    return data?.data || null;
  } catch (error) {
    console.error('Error fetching portfolio data:', error)
    return null
  }
}