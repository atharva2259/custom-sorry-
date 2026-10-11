import React, { useState } from 'react';
import { ApologySite } from '../../types/builder';
import { generateMailtoLink, getShareableUrl } from '../../utils/shareUtils';
import { X, Mail, Copy, Check, ExternalLink, Send, Heart, Sparkles } from 'lucide-react';

interface EmailShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  site: ApologySite;
  onUpdateSite: (updated: Partial<ApologySite>) => void;
}

export const EmailShareModal: React.FC<EmailShareModalProps> = ({
  isOpen,
  onClose,
  site,
  onUpdateSite,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);
  const [customSubject, setCustomSubject] = useState(
    `An honest apology from the bottom of my heart, ${site.recipientName || 'My Love'} 💌`
  );

  if (!isOpen) return null;

  const shareUrl = getShareableUrl(site);
  const mailtoLink = generateMailtoLink(
    site.recipientEmail,
    site.recipientName,
    site.apologizerName,
    shareUrl,
    customSubject
  );

  const emailDraftPreview = `My Dearest ${site.recipientName || 'Love'},

I am writing this because you mean everything to me, and I owe you a sincere apology. What happened recently was my mistake, and I am deeply sorry for causing you any hurt or disappointment.

I built a dedicated, private apology letter and promise bond for you to read:
${shareUrl}

Inside you will find:
• My handwritten letter & honest reflections
• An official Solemn Reconciliation Bond guaranteeing this mistake will never happen again (with digital signatures)
• Reconciliation vouchers redeemable whenever you wish
• A space where you can share your honest feelings

Please take all the time you need. I will always cherish and respect you.

Forever yours,
${site.apologizerName || 'Julian'}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyBody = () => {
    navigator.clipboard.writeText(emailDraftPreview);
    setCopiedBody(true);
    setTimeout(() => setCopiedBody(false), 2500);
  };

  const handleLaunchEmailClient = () => {
    window.location.href = mailtoLink;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 max-h-[92vh] overflow-y-auto my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900 font-serif">
                Send Apology & Promise Bond via Email
              </h2>
              <p className="text-xs text-neutral-500">
                Deliver your custom website, letter, and contract bond directly to {site.recipientName || 'your partner'}.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-neutral-700 block mb-1">
                Recipient Email:
              </label>
              <input
                type="email"
                value={site.recipientEmail}
                onChange={(e) => onUpdateSite({ recipientEmail: e.target.value })}
                placeholder="partner@example.com"
                className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-neutral-700 block mb-1">
                Recipient Name:
              </label>
              <input
                type="text"
                value={site.recipientName}
                onChange={(e) => onUpdateSite({ recipientName: e.target.value })}
                placeholder="e.g. Sarah"
                className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-700 block mb-1">
              Email Subject Line:
            </label>
            <input
              type="text"
              value={customSubject}
              onChange={(e) => setCustomSubject(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 font-sans"
            />
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-5 mb-6 text-center">
          <button
            type="button"
            onClick={handleLaunchEmailClient}
            className="w-full py-3 px-6 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
            Open Mail Client & Send to {site.recipientEmail || 'Recipient'}
          </button>
          <span className="text-[11px] text-rose-800/80 mt-2 block">
            Pre-fills your default email app (Gmail, Apple Mail, Outlook) with the letter and dedicated website link.
          </span>
        </div>

        {/* Shareable Link Box */}
        <div className="mb-6 p-4 rounded-xl bg-neutral-50 border border-neutral-200">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-1 font-semibold">
            Direct Shareable Apology Link:
          </span>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 px-3 py-1.5 text-xs bg-white border border-neutral-200 rounded-lg font-mono text-neutral-600 truncate select-all"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3 py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedLink ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Email Body Preview */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
              Email Invitation Message Preview:
            </span>
            <button
              type="button"
              onClick={handleCopyBody}
              className="text-xs text-rose-700 hover:text-rose-800 font-medium flex items-center gap-1 cursor-pointer"
            >
              {copiedBody ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              {copiedBody ? 'Copied Text' : 'Copy Message Text'}
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-neutral-900 text-neutral-200 text-xs font-sans whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
            {emailDraftPreview}
          </pre>
        </div>
      </div>
    </div>
  );
};
