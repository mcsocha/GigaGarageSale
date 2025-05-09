import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations'

export function fadeIn(timingIn: number, height: boolean = false): AnimationTriggerMetadata {
    return trigger('fadeIn', [
        transition(':enter', [
            style(height ? { opacity: 0, height: 0, } : { opacity: 0, }),
            animate(timingIn, style(height ? { opacity: 1, height: 'fit-content' } : { opacity: 1 }))
        ])
    ]);
}

export function fadeOut(timingOut: number): AnimationTriggerMetadata {
    return trigger('fadeOut', [
        state('in', style({ opacity: 1 })),
        transition(':leave', [
            animate(`${timingOut}ms ease-out`, style({ opacity: 0 }))
        ])
    ]);
}

