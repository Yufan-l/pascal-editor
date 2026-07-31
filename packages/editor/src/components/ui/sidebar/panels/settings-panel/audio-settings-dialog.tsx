import { useI18n } from '@pascal-app/i18n'
import { Volume2, VolumeX } from 'lucide-react'
import { editorMessages } from '../../../../../i18n/messages'
import { Button } from '../../../../../components/ui/primitives/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../../components/ui/primitives/dialog'
import { Slider } from '../../../../../components/ui/slider'
import useAudio from '../../../../../store/use-audio'

export function AudioSettingsDialog() {
  const { t } = useI18n()
  const {
    masterVolume,
    sfxVolume,
    radioVolume,
    muted,
    setMasterVolume,
    setSfxVolume,
    setRadioVolume,
    toggleMute,
  } = useAudio()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full justify-start gap-2" variant="outline">
          {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          {t(editorMessages.audioSettings)}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t(editorMessages.audioSettings)}</DialogTitle>
          <DialogDescription>{t(editorMessages.audioSettingsDescription)}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Master Volume */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-medium text-sm">{t(editorMessages.masterVolume)}</label>
              <span className="text-muted-foreground text-sm">{masterVolume}%</span>
            </div>
            <Slider
              aria-label={t(editorMessages.masterVolume)}
              disabled={muted}
              max={100}
              onValueChange={(value) => value[0] !== undefined && setMasterVolume(value[0])}
              step={1}
              value={[masterVolume]}
            />
          </div>

          {/* Radio Volume */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-medium text-sm">{t(editorMessages.radioVolume)}</label>
              <span className="text-muted-foreground text-sm">{radioVolume}%</span>
            </div>
            <Slider
              aria-label={t(editorMessages.radioVolume)}
              disabled={muted}
              max={100}
              onValueChange={(value) => value[0] !== undefined && setRadioVolume(value[0])}
              step={1}
              value={[radioVolume]}
            />
          </div>

          {/* SFX Volume */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-medium text-sm">{t(editorMessages.soundEffects)}</label>
              <span className="text-muted-foreground text-sm">{sfxVolume}%</span>
            </div>
            <Slider
              aria-label={t(editorMessages.soundEffects)}
              disabled={muted}
              max={100}
              onValueChange={(value) => value[0] !== undefined && setSfxVolume(value[0])}
              step={1}
              value={[sfxVolume]}
            />
          </div>

          {/* Mute Toggle */}
          <div className="border-t pt-4">
            <Button
              className="w-full justify-start gap-2"
              onClick={toggleMute}
              variant={muted ? 'default' : 'outline'}
            >
              {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
              {t(muted ? editorMessages.unmuteAllSounds : editorMessages.muteAllSounds)}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
