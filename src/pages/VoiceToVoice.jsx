import React, { useState } from 'react'
import { UploadIcon, VolumeUpIcon, GlobeIcon } from '@heroicons/react/solid'

export default function VoiceToVoice() {
  const [responseText, setResponseText] = useState('')
  const [audioResponse, setAudioResponse] = useState('')
  const [translationResponse, setTranslationResponse] = useState('')

  const uploadAudio = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    try {
      const response = await fetch('https://api.sarvam.ai/speech-to-text', {
        method: 'POST',
        headers: {
          'api-subscription-key': 'aea65b58-230a-4763-b127-0d1c2a43a714',
        },
        body: formData,
      })
      const data = await response.json()
      setResponseText(JSON.stringify(data, null, 2))
    } catch (error) {
      console.error('Error uploading audio:', error)
      setResponseText('An error occurred while uploading the audio.')
    }
  }

  const convertTextToSpeech = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const textInput = formData.get('textInput')
    try {
      const response = await fetch('https://api.sarvam.ai/text-to-speech', {
        method: 'POST',
        headers: {
          'api-subscription-key': 'aea65b58-230a-4763-b127-0d1c2a43a714',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: [textInput],
          target_language_code: 'te-IN',
          speaker: 'arvind',
          pitch: 0,
          pace: 1.5,
          loudness: 1.5,
          speech_sample_rate: 16000,
          enable_preprocessing: true,
          model: 'bulbul:v1',
        }),
      })
      const data = await response.json()
      if (data.audios && data.audios.length > 0) {
        setAudioResponse(data.audios[0])
      }
    } catch (error) {
      console.error('Error converting text to speech:', error)
      setAudioResponse('An error occurred during text-to-speech conversion.')
    }
  }

  const translateText = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const textToTranslate = formData.get('textToTranslate')
    try {
      const response = await fetch('https://api.sarvam.ai/translate', {
        method: 'POST',
        headers: {
          'api-subscription-key': 'aea65b58-230a-4763-b127-0d1c2a43a714',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: textToTranslate,
          source_language_code: 'en-IN',
          target_language_code: 'te-IN',
          speaker_gender: 'Male',
          mode: 'formal',
          model: 'mayura:v1',
          enable_preprocessing: true,
        }),
      })
      const data = await response.json()
      setTranslationResponse(JSON.stringify(data, null, 2))
    } catch (error) {
      console.error('Error translating text:', error)
      setTranslationResponse('An error occurred during translation.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-center text-gray-900">Audio and Text Processing</h1>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Upload Audio for Speech-to-Text</h2>
          <form onSubmit={uploadAudio} className="space-y-4">
            <div>
              <label htmlFor="audioFile" className="block text-sm font-medium text-gray-700">
                Choose audio file:
              </label>
              <input
                type="file"
                id="audioFile"
                name="file"
                accept="audio/*"
                required
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            <div>
              <label htmlFor="languageCode" className="block text-sm font-medium text-gray-700">
                Language Code:
              </label>
              <input
                type="text"
                id="languageCode"
                name="language_code"
                defaultValue="hi-IN"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <input type="hidden" name="model" value="saarika:v1" />
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <UploadIcon className="w-5 h-5 mr-2" />
              Upload and Translate
            </button>
          </form>
          {responseText && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <pre className="whitespace-pre-wrap">{responseText}</pre>
            </div>
          )}
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Convert Text to Speech</h2>
          <form onSubmit={convertTextToSpeech} className="space-y-4">
            <div>
              <label htmlFor="textInput" className="block text-sm font-medium text-gray-700">
                Enter text to convert to speech:
              </label>
              <textarea
                id="textInput"
                name="textInput"
                required
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <VolumeUpIcon className="w-5 h-5 mr-2" />
              Convert to Speech
            </button>
          </form>
          {audioResponse && (
            <div className="mt-4">
              <audio controls src={`data:audio/wav;base64,${audioResponse}`} className="w-full" />
              <a
                href={`data:audio/wav;base64,${audioResponse}`}
                download="generated_audio.wav"
                className="mt-2 inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Download Audio
              </a>
            </div>
          )}
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Translate Text</h2>
          <form onSubmit={translateText} className="space-y-4">
            <div>
              <label htmlFor="textToTranslate" className="block text-sm font-medium text-gray-700">
                Enter text to translate:
              </label>
              <textarea
                id="textToTranslate"
                name="textToTranslate"
                required
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <GlobeIcon className="w-5 h-5 mr-2" />
              Translate
            </button>
          </form>
          {translationResponse && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <pre className="whitespace-pre-wrap">{translationResponse}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}