
    document.addEventListener('DOMContentLoaded', () => {
      const form = document.querySelector('#card-form');
      if (!form) return;

      // ensure an errors container exists
      let errorsEl = document.querySelector('.errors');
      if (!errorsEl) {
        errorsEl = document.createElement('div');
        errorsEl.className = 'errors';
        errorsEl.setAttribute('aria-live', 'polite');
        errorsEl.style.whiteSpace = 'pre-wrap';
        errorsEl.style.color = 'crimson';
        form.parentNode.insertBefore(errorsEl, form);
      }

      function displayError(msg) {
        errorsEl.textContent = msg;
      }

      function isCardNumberValid(number) {
        // Validate exact test card number used in the ponder activity
        return number === '1234123412341234';
      }

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        displayError('');

        const cardNum = (document.querySelector('#creditCardNumber')?.value || '').trim();
        const cardholder = (document.querySelector('#cardholder')?.value || '').trim();
        const expMonth = (document.querySelector('#expMonth')?.value || '').trim();
        const expYear = (document.querySelector('#expYear')?.value || '').trim();
        const cvc = (document.querySelector('#threeNumbers')?.value || '').trim();

        const errors = [];

        if (!/^\d{16}$/.test(cardNum)) errors.push('Card number must be 16 digits.');
        else if (!isCardNumberValid(cardNum)) errors.push('Bad card number.');

        if (!cardholder) errors.push('Cardholder name is required.');

        if (!/^\d{2}$/.test(expMonth) || Number(expMonth) < 1 || Number(expMonth) > 12) errors.push('Expiration month must be 01-12.');
        if (!/^\d{2}$/.test(expYear)) errors.push('Expiration year must be two digits.');

        if (/^\d{2}$/.test(expMonth) && /^\d{2}$/.test(expYear)) {
          const now = new Date();
          const month = Number(expMonth); // 1-12
          const year = 2000 + Number(expYear);
          // last moment of the expiration month (valid through that day)
          const lastMoment = new Date(year, month, 0, 23, 59, 59, 999);
          if (lastMoment < now) errors.push('Card is expired.');
        }

        if (!/^\d{3,4}$/.test(cvc)) errors.push('CVC/CVV must be 3 or 4 digits.');

        if (errors.length) {
          displayError(errors.join('\n'));
          errorsEl.focus?.();
          return;
        }

        // show confirmation
        form.innerHTML = '<h2>Thank you for your purchase!</h2>';
      });
    });
          