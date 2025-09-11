import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JobDescription, MatchAnalysis } from '@/types/resume';

interface JobMatchingState {
  currentJobDescription?: JobDescription;
  matchAnalysis?: MatchAnalysis;
  isAnalyzing: boolean;
  error: string | null;
  jobHistory: JobDescription[];
}

const initialState: JobMatchingState = {
  currentJobDescription: undefined,
  matchAnalysis: undefined,
  isAnalyzing: false,
  error: null,
  jobHistory: [],
};

const jobMatchingSlice = createSlice({
  name: 'jobMatching',
  initialState,
  reducers: {
    setJobDescription: (state, action: PayloadAction<JobDescription>) => {
      state.currentJobDescription = action.payload;
      // Add to history if it's not already there
      const exists = state.jobHistory.some(job => 
        job.title === action.payload.title && job.company === action.payload.company
      );
      if (!exists) {
        state.jobHistory.unshift(action.payload);
        // Keep only the last 10 job descriptions
        if (state.jobHistory.length > 10) {
          state.jobHistory = state.jobHistory.slice(0, 10);
        }
      }
    },

    updateJobDescription: (state, action: PayloadAction<Partial<JobDescription>>) => {
      if (state.currentJobDescription) {
        state.currentJobDescription = { ...state.currentJobDescription, ...action.payload };
      }
    },

    setMatchAnalysis: (state, action: PayloadAction<MatchAnalysis>) => {
      state.matchAnalysis = action.payload;
    },

    setAnalyzing: (state, action: PayloadAction<boolean>) => {
      state.isAnalyzing = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    clearJobDescription: (state) => {
      state.currentJobDescription = undefined;
      state.matchAnalysis = undefined;
      state.error = null;
    },

    removeFromHistory: (state, action: PayloadAction<number>) => {
      state.jobHistory.splice(action.payload, 1);
    },

    clearHistory: (state) => {
      state.jobHistory = [];
    },

    // For basic keyword extraction in Phase 1
    extractKeywords: (state, action: PayloadAction<string>) => {
      if (state.currentJobDescription) {
        const text = action.payload.toLowerCase();
        const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'do', 'does', 'did', 'get', 'got', 'make', 'made', 'take', 'took', 'come', 'came', 'go', 'went', 'see', 'saw', 'know', 'knew', 'think', 'thought', 'say', 'said', 'work', 'worked', 'use', 'used', 'find', 'found', 'give', 'gave', 'tell', 'told', 'ask', 'asked', 'try', 'tried', 'call', 'called', 'need', 'needed', 'feel', 'felt', 'become', 'became', 'leave', 'left', 'put', 'seem', 'seemed', 'keep', 'kept', 'let', 'begin', 'began', 'help', 'helped', 'show', 'showed', 'hear', 'heard', 'play', 'played', 'run', 'ran', 'move', 'moved', 'live', 'lived', 'believe', 'believed', 'bring', 'brought', 'happen', 'happened', 'write', 'wrote', 'sit', 'sat', 'stand', 'stood', 'lose', 'lost', 'pay', 'paid', 'meet', 'met', 'include', 'included', 'continue', 'continued', 'set', 'expect', 'expected', 'build', 'built', 'remain', 'remained', 'fall', 'fell', 'reach', 'reached', 'kill', 'killed', 'raise', 'raised', 'pass', 'passed', 'sell', 'sold', 'decide', 'decided', 'return', 'returned', 'explain', 'explained', 'hope', 'hoped', 'develop', 'developed', 'carry', 'carried', 'break', 'broke', 'receive', 'received', 'agree', 'agreed', 'support', 'supported', 'hit', 'remember', 'remembered', 'consider', 'considered', 'appear', 'appeared', 'buy', 'bought', 'serve', 'served', 'die', 'died', 'send', 'sent', 'expect', 'expected', 'stay', 'stayed', 'talk', 'talked', 'grow', 'grew', 'thank', 'thanked', 'provide', 'provided', 'open', 'opened', 'walk', 'walked', 'win', 'won', 'offer', 'offered', 'remember', 'remembered', 'love', 'loved', 'consider', 'considered', 'appear', 'appeared', 'buy', 'bought', 'wait', 'waited', 'turn', 'turned', 'start', 'started'];
        
        // Simple keyword extraction - split by spaces and filter out common words
        const words = text
          .replace(/[^\w\s]/g, ' ')
          .split(/\s+/)
          .filter(word => word.length > 2 && !commonWords.includes(word.toLowerCase()))
          .map(word => word.toLowerCase());
        
        // Count frequency and get top keywords
        const wordCount: Record<string, number> = {};
        words.forEach(word => {
          wordCount[word] = (wordCount[word] || 0) + 1;
        });
        
        // Get top 20 most frequent keywords
        const keywords = Object.entries(wordCount)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 20)
          .map(([word]) => word);
        
        state.currentJobDescription.keywords = keywords;
      }
    },
  },
});

export const {
  setJobDescription,
  updateJobDescription,
  setMatchAnalysis,
  setAnalyzing,
  setError,
  clearJobDescription,
  removeFromHistory,
  clearHistory,
  extractKeywords,
} = jobMatchingSlice.actions;

export default jobMatchingSlice.reducer;
