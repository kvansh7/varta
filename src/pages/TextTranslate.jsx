import React, { useState } from 'react'
import axios from 'axios'

export default function TranslationApp() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [direction, setDirection] = useState('hi_to_en') // Removed type annotation
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleTranslate = async () => {
    setIsLoading(true)
    setError('')
    setSuccess(false)
    try {
      const response = await axios.post('http://localhost:5000/translate', {
        text: inputText,
        direction: direction
      })
      setOutputText(response.data.translated_text)
      setSuccess(true)
    } catch (error) {
      console.error('Translation error:', error)
      setError('An error occurred during translation. Please try again.')
    }
    setIsLoading(false)
  }

  const handleSwapLanguages = () => {
    setDirection(prev => (prev === 'hi_to_en' ? 'en_to_hi' : 'hi_to_en'))
    setInputText(outputText)
    setOutputText('')
    setSuccess(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-8">
          NER-based Translation
        </h1>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-center space-x-4">
              <span className={`text-lg font-medium ${direction === 'hi_to_en' ? 'text-indigo-600' : 'text-gray-500'}`}>
                Hindi
              </span>
              <button
                onClick={handleSwapLanguages}
                className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors duration-200"
              >
                ↔️
              </button>
              <span className={`text-lg font-medium ${direction === 'en_to_hi' ? 'text-indigo-600' : 'text-gray-500'}`}>
                English
              </span>
            </div>
            <div className="space-y-4">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
                placeholder={`Enter text in ${direction === 'hi_to_en' ? 'Hindi' : 'English'}`}
              />
              <button
                onClick={handleTranslate}
                disabled={isLoading || !inputText.trim()}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? (
                  <span className="animate-spin">🔄</span>
                ) : (
                  'Translate'
                )}
              </button>
            </div>
            {error && (
              <div className="flex items-center space-x-2 text-red-600">
                ❗
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="flex items-center space-x-2 text-green-600">
                ✅
                <span>Translation successful!</span>
              </div>
            )}
            {outputText && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Translated Text</h2>
                <p className="text-gray-700 bg-gray-100 p-4 rounded-lg whitespace-pre-wrap">
                  {outputText}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}