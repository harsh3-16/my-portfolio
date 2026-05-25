# Harsh Arora | Creative Developer Portfolio

A highly interactive, premium web portfolio built with Next.js 16, React 19, GSAP, and Tailwind CSS v4. Designed with a focus on fluid animations, smooth scrolling, and an immersive user experience.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS v4
- **Animations:** GSAP (GreenSock Animation Platform) + `@gsap/react`
- **Scrolling:** Lenis (Smooth Scroll)
- **Toasts:** `react-hot-toast`
- **Fonts:** Inter & Oswald (Google Fonts)

---

## Deep Dive: Animation Strategy

The portfolio leverages **GSAP** (GreenSock Animation Platform) integrated via the `@gsap/react` hook (`useGSAP`) for highly performant, timeline-based animations. **Lenis** is utilized to override native browser scrolling, providing a buttery-smooth experience.

### 1. Preloader Sequence (`app/components/Preloader.tsx`)
The preloader blocks the UI (`document.body.style.overflow = "hidden"`) and orchestrates a multi-step timeline:
- Text nodes are animated out of their `overflow-hidden` wrappers utilizing a stagger effect (`stagger: 0.2`) with `y: 100` and `skewY: 10` (Ease: `power4.out`).
- The timeline pauses for 0.5s before pulling the text back up (`y: -100`, `skewY: -10`) using a `power3.in` ease.
- The main container's height scales to `0` using `expo.inOut` over 1 second, simultaneously revealing the site. A secondary offset background is scaled down `<0.1` seconds later to create a subtle depth effect.

### 2. Custom Cursor (`app/components/Cursor.tsx`)
A stylized DOM-based cursor replaces the default mouse pointer. It utilizes `gsap.quickTo()` for `x` and `y` coordinates to bypass standard tween overhead and sync directly to mousemove events. It tracks the pointer with a 0.3s duration and `power3` easing, achieving an ultra-responsive, floating feel. The element employs `mix-blend-difference` to contrast against the dynamic backgrounds.

### 3. Magnetic Interactivity (`app/components/MagneticButtons.tsx`)
Interactive elements utilize bounding box calculations (`getBoundingClientRect`) relative to the cursor's position on `mousemove`. Elements are tweened on the X and Y axes toward the cursor utilizing an elastic ease (`elastic.out(1, 0.3)`). When the mouse leaves, the coordinates tween back to `0,0` with the same elastic bounce.

### 4. Custom Page Routing (`app/template.tsx` & `TransitionLink.tsx`)
Standard Next.js routing is intercepted to create seamless visual transitions:
- **`TransitionLink`:** Prevents default navigation. It triggers a GSAP timeline scaling a `fixed` transition layer up (`scaleY: 1`, transformOrigin: `bottom`, `power4.inOut`). Once the layer covers the screen, `router.push()` is fired.
- **`template.tsx`:** Next.js mounts this fresh on every route change. `useGSAP` immediately fires to scale the layer back down to `0` from the `top` (transformOrigin: `top`), revealing the newly mounted page seamlessly without a flash of unstyled content.

### 5. Scroll Syncing (`app/components/SmoothScroll.tsx`)
Lenis is instantiated globally with an easing function `Math.min(1, 1.001 - Math.pow(2, -10 * t))` and a duration of `1.2s`.
Crucially, Lenis is synced with GSAP's rendering engine:
```typescript
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```
This guarantees that ScrollTrigger animations stay perfectly anchored to the Lenis scroll progress without judder.

### 6. ScrollTriggered Hero Sequence (`app/components/Hero.tsx`)
The Hero section utilizes complex pinning and scrubbed animations via `ScrollTrigger` (`scrub: 1`).
- **Text Splitting Entrance:** Headlines are split into individual character spans starting with a `rotate-[15deg]` and `translate-y-full`. They animate in using a 0.05s stagger and `power4.out` easing.
- **Scrub Timeline:** As the user scrolls, a timeline anchored to the `container` pushes the initial text up and out (`scale: 0.9`, `y: -100`), pulls in a secondary title, and finally dramatically scales a background element (`scale: 100`, `power2.inOut`) to act as a transition into the next content section.
- **Continuous Breathing:** A background glow element loops indefinitely (`repeat: -1, yoyo: true`) using a `sine.inOut` ease, modulating scale and opacity.

### 7. Generative Fluid Background (`app/components/FluidBackground.tsx`)
A non-obtrusive, ambient background consisting of animated gradient blobs.
- **Organic Motion:** GSAP's random string values (e.g., `random(-300, 300)`) are used within tweens to generate organic floating motion on the X/Y axes and scale, running indefinitely with `yoyo: true` and `sine.inOut` easing.
- **Delayed Mouse Tracking:** An additional interactive blob tracks the user's cursor but utilizes a long 3-second duration and `power3.out` easing to create a fluid, highly delayed dragging effect that feels physically weighty.

---

## Component Architecture

### Global / UI Components

- **`SmoothScroll.tsx`:** Wrapper component that initializes Lenis. Encompasses the main content in `layout.tsx`.
- **`Cursor.tsx`:** A custom, stylized mouse cursor that follows the user's pointer using GSAP `quickTo` for high-performance tracking.
- **`FluidBackground.tsx`:** A dynamic, animated background element adding depth and texture to the premium aesthetic.
- **`MagneticButtons.tsx`:** Interactive buttons that "pull" towards the cursor when hovered, creating a magnetic effect using GSAP.
- **`TransitionLink.tsx`:** A custom `<Link>` replacement that intercepts routing to trigger the GSAP page transition timeline.

### Layout Components (`app/components/layout/`)

- **`Header.tsx`:** Global navigation bar. Contains `TransitionLink`s to route smoothly between pages.
- **`Footer.tsx`:** Global footer containing social links and contact information.

### Section / Feature Components

- **`HomeClient.tsx`:** The primary client-side entry point for the homepage, orchestrating the initial view.
- **`Hero.tsx`:** The main landing section of the homepage. Features heavy typography animations on load.
- **`WorkCard.tsx` / `ProjectItem.tsx`:** Components used to display portfolio pieces or case studies, often featuring hover reveals or parallax image effects.

### General UI (`app/components/ui/`)

- **`Modal.tsx`:** Reusable modal overlay for popups or detailed views.
- **`Skeleton.tsx`:** Shimmer loading state for suspense boundaries or data-fetching delays.
- **`PullToRefresh.tsx`:** Utility for mobile interactions, allowing users to refresh data natively.

---

## Layout & Setup (`app/layout.tsx`)

The root layout is responsible for:
1. Injecting custom fonts (Inter, Oswald).
2. Rendering global overlays (`Preloader`, `Cursor`, `FluidBackground`, Noise Overlay).
3. Setting up `react-hot-toast` for notifications.
4. Wrapping children in the `SmoothScroll` context and `<Header>` / `<Footer>`.

## Development

```bash
# Install dependencies
yarn install

# Run the development server
yarn dev
```
