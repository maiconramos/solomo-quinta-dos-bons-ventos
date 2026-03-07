"use client";

import { useEffect, useRef, useCallback } from "react";
import { basePath } from "@/lib/env";

const ENABLE_TRACKING = process.env.NEXT_PUBLIC_ENABLE_TRACKING === "true";
const TEST_EVENT_CODE = process.env.NEXT_PUBLIC_META_TEST_EVENT_CODE || "";

interface TrackData {
  email?: string;
  phone?: string;
  name?: string;
  form_name?: string;
  form_id?: string;
}

type FbqFunction = (
  method: string,
  eventName: string,
  params?: Record<string, unknown>,
  options?: { eventID: string }
) => void;

declare global {
  interface Window {
    fbq?: FbqFunction;
  }
}

function getCookie(name: string): string {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}

function getFbc(): string {
  const existing = getCookie("_fbc");
  if (existing) return existing;

  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get("fbclid");
  if (fbclid) {
    return `fb.1.${Date.now()}.${fbclid}`;
  }
  return "";
}

function fireServerEvent(eventName: string, eventId: string, data: TrackData) {
  const payload = {
    event_name: eventName,
    event_id: eventId,
    event_source_url: window.location.href,
    user_data: {
      email: data.email || "",
      phone: data.phone || "",
      fbp: getCookie("_fbp"),
      fbc: getFbc(),
      client_user_agent: navigator.userAgent,
      client_ip_address: "",
    },
    custom_data: {
      name: data.name || "",
      form_name: data.form_name || "",
      form_id: data.form_id || "",
    },
    test_event_code: TEST_EVENT_CODE,
  };

  fetch(`${basePath}/api/messenger.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {
    // Fire and forget
  });
}

function fireBrowserPixel(
  eventName: string,
  eventId: string,
  data: TrackData
) {
  if (typeof window.fbq !== "function") return;

  const customData: Record<string, unknown> = {};
  if (data.email) customData.email = data.email;
  if (data.phone) customData.phone = data.phone;
  if (data.name) customData.content_name = data.name;
  if (data.form_name) customData.form_name = data.form_name;
  if (data.form_id) customData.form_id = data.form_id;

  window.fbq("track", eventName, customData, { eventID: eventId });
}

export type TrackFunction = (eventName: string, data?: TrackData) => void;

export function useTracking(): { track: TrackFunction } {
  const pageViewFired = useRef(false);

  const track: TrackFunction = useCallback(
    (eventName: string, data: TrackData = {}) => {
      if (!ENABLE_TRACKING) return;

      const eventId = crypto.randomUUID();
      fireBrowserPixel(eventName, eventId, data);
      fireServerEvent(eventName, eventId, data);
    },
    []
  );

  // Auto-fire PageView on mount (once)
  useEffect(() => {
    if (!ENABLE_TRACKING) return;
    if (pageViewFired.current) return;

    pageViewFired.current = true;
    track("PageView");
  }, [track]);

  // WhatsApp click detection
  useEffect(() => {
    if (!ENABLE_TRACKING) return;

    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (href.includes("wa.me") || href.includes("whatsapp")) {
        track("Contact");
      }
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [track]);

  return { track };
}
