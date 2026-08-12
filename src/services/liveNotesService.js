/**
 * Live Educational API Service for GyanSetu
 * Fetches authentic educational notes, Wikipedia summaries, and NCERT-aligned content.
 */

// Featured High-Yield Exam Topics
export const FEATURED_API_TOPICS = [
  { id: 'polity-1', title: 'Fundamental_Rights_in_India', label: 'Fundamental Rights (Art 12-35)', category: 'Polity' },
  { id: 'polity-2', title: 'Directive_Principles', label: 'Directive Principles (DPSP)', category: 'Polity' },
  { id: 'history-1', title: 'Indian_independence_movement', label: 'Indian Freedom Struggle', category: 'History' },
  { id: 'history-2', title: 'Vedic_period', label: 'Vedic Period & Ancient History', category: 'History' },
  { id: 'banking-1', title: 'Reserve_Bank_of_India', label: 'Reserve Bank of India & Monetary Policy', category: 'Banking' },
  { id: 'quant-1', title: 'Percentage', label: 'Mathematics: Percentage Concepts', category: 'Quant' },
];

/**
 * Fetch live educational summary note from Wikipedia REST API
 * @param {string} topicKey 
 */
export async function fetchLiveWikiNote(topicKey) {
  try {
    const formattedKey = encodeURIComponent(topicKey.trim().replace(/\s+/g, '_'));
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${formattedKey}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch note for ${topicKey}`);
    }

    const data = await response.json();
    return {
      success: true,
      title: data.title,
      description: data.description || 'Educational Subject Summary',
      extract: data.extract,
      thumbnail: data.thumbnail ? data.thumbnail.source : null,
      sourceUrl: data.content_urls ? data.content_urls.desktop.page : `https://en.wikipedia.org/wiki/${formattedKey}`,
      timestamp: new Date().toLocaleTimeString()
    };
  } catch (error) {
    console.error('Error fetching live educational API note:', error);
    return {
      success: false,
      title: topicKey,
      description: 'Educational Note',
      extract: `High-yield notes for ${topicKey} (Offline Fallback):\n1. Key Concept: Memorize fundamental definitions.\n2. Exam Focus: Frequently asked in UPSC Prelims & SSC CGL Tier-1.\n3. Practice PYQ: Solve chapter-end questions in GyanSetu Question Bank.`,
      sourceUrl: 'https://en.wikipedia.org',
      timestamp: new Date().toLocaleTimeString()
    };
  }
}
