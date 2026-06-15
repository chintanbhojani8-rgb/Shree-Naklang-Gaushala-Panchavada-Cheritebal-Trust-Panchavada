import { useAppState } from '../store';
import { Calendar, Play, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

export default function EventsPage() {
  const { events } = useAppState();
  const [viewingPhotos, setViewingPhotos] = useState<string[] | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fadeInUp">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-gray-800 mb-3">
          Our <span className="text-saffron">Events & Activities</span> 🎉
        </h1>
        <div className="w-24 h-1 gradient-saffron rounded-full mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Stay updated with our latest events and celebrations</p>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📅</div>
          <p className="text-xl text-gray-400">No events yet. Stay tuned!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {events.map(event => (
            <div key={event.id} className="glass-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
              {/* Event Photos */}
              {event.photos.length > 0 && (
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.photos[0]}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {event.photos.length > 1 && (
                    <button
                      onClick={() => setViewingPhotos(event.photos)}
                      className="absolute bottom-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-white/90 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition-colors"
                    >
                      <ImageIcon className="w-4 h-4" /> {event.photos.length} Photos
                    </button>
                  )}
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-saffron font-medium mb-3">
                  <Calendar className="w-4 h-4" />
                  {new Date(event.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{event.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{event.description}</p>

                {event.videoUrl && (
                  <a
                    href={event.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
                  >
                    <Play className="w-4 h-4" /> Watch Video
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Photo Gallery Modal */}
      {viewingPhotos && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setViewingPhotos(null)}>
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <div className="flex justify-end mb-4">
              <button onClick={() => setViewingPhotos(null)} className="text-white text-xl font-bold px-4 py-2 hover:text-saffron transition-colors">✕ Close</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {viewingPhotos.map((photo, i) => (
                <img key={i} src={photo} alt={`Event photo ${i + 1}`} className="w-full h-64 object-cover rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
